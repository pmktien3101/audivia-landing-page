import { HubConnectionBuilder, LogLevel, HubConnectionState, HttpTransportType } from '@microsoft/signalr';

const API_URL = import.meta.env.VITE_SIGNALR_URL;

class chatSignalRService {
    connection = null;
    messageCallbacks = [];
    typingCallbacks = [];
    connectionStateCallbacks = [];
    userJoinedCallbacks = []

    async startConnection(token) {
        try {
            this.connection = new HubConnectionBuilder()
                .withUrl(`${API_URL}/chatHub`, {
                    accessTokenFactory: () => token,
                    transport: HttpTransportType.WebSockets,
                    // withCredentials: true,
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();
            await this.connection.start();
            this.notifyConnectionState(this.connection.state);
            this.setupEventHandlers();
            
        } catch (error) {
            console.error('SignalR Connection Error:', error);
            this.notifyConnectionState(HubConnectionState.Disconnected);
        }
    }

    isConnected() {
        return this.connection?.state === HubConnectionState.Connected;
    }

    getConnectionState() {
        return this.connection?.state || null;
    }

    onConnectionStateChange(callback) {
        this.connectionStateCallbacks.push(callback);
    }
    removeConnectionStateCallback(callback) {
        this.connectionStateCallbacks = this.connectionStateCallbacks.filter(cb => cb !== callback);
    }
    notifyConnectionState(state) {
        console.log('SignalR connection state changed:', state);
        this.connectionStateCallbacks.forEach(callback => callback(state));
    }

    setupEventHandlers() {
        //lắng nghe các sự kiện
        if (!this.connection) return;
        this.connection.onclose(() => {
            this.notifyConnectionState(HubConnectionState.Disconnected);
        });
        this.connection.onreconnecting(() => {
            this.notifyConnectionState(HubConnectionState.Reconnecting);
        });
        this.connection.onreconnected(() => {
            this.notifyConnectionState(HubConnectionState.Connected);
        });
        this.connection.on('UserTyping', (data) => {
            this.typingCallbacks.forEach(callback => callback(data));
        });
        this.connection.on('ReceiveMessage', (message) => {
            this.messageCallbacks.forEach(callback => callback(message));
        });
        
        this.connection.on('UserJoined', (member) => {
            this.userJoinedCallbacks.forEach(callback => callback(member));
        });
    }

    //Cập nhật UI ngay khi nhận được tin nhắn mới
    // Vậy nên joinRoom là điều kiện để nhận dữ liệu realtime, 
    // còn callback là cách để xử lý khi dữ liệu realtime đến.
    onReceiveMessage(callback) {
        this.messageCallbacks.push(callback);
    }
    removeMessageCallback(callback) {
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    }
    onUserTyping(callback) {
        this.typingCallbacks.push(callback);
    }
    removeTypingCallback(callback) {
        this.typingCallbacks = this.typingCallbacks.filter(cb => cb !== callback);
    }

    async joinRoom(chatRoomId) {
        if (!this.connection) throw new Error('SignalR connection not started');
        await this.connection.invoke('JoinRoom', chatRoomId);
    }
    async leaveRoom(chatRoomId) {
        if (!this.connection) throw new Error('SignalR connection not started');
        await this.connection.invoke('LeaveRoom', chatRoomId);
    }
    async sendTypingStatus(chatRoomId, userId) {
        if (!this.connection || this.connection.state !== HubConnectionState.Connected) {
            console.warn('SignalR not connected. Cannot send typing status.');
            return;
        }
    
        try {
            await this.connection.invoke('SendTyping', chatRoomId, userId);
        } catch (error) {
            console.error('Error sending typing status:', error);
        }
    }
    //[User A] nhập văn bản...
   //⮕ gọi sendTypingStatus(...) → gửi "SendTyping" lên Hub
   //⮕ Hub gọi Clients.OthersInGroup(...) → gửi "UserTyping" xuống các user khác
     //  ⮕ [User B, C] nhận được "UserTyping" → hiển thị "A đang nhập..."

}

export const ChatSignalRService = new chatSignalRService();