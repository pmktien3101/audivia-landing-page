import React, { useEffect, useState } from 'react'
import './style.css'
import TransactionList from '../../../components/Payment/TransactionList';
import DepositModal from '../../../components/Payment/DepositModal';
import userService from '../../../services/user';
import PaymentService from '../../../services/payment';
import toast from 'react-hot-toast';

const MyWallet = () => {
    const [user, setUser] = useState()
    const [showModal, setShowModal] = useState(false)
    const [activeTab, setActiveTab] = useState('all');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchCurrentUser = async() => {
      try {
          const result = await userService.getCurrentUser();
          console.log('USERr', result)
          if(result){
              setUser(result);
          }
      } catch (error) {
          console.error('Lỗi lấy thông tin người dùng:', error);
      }
  };

  useEffect(() => {
    fetchCurrentUser()
  }, [])

    // const [balance, setBalance] = useState(5000000); // Số dư mặc định
    const [transactions] = useState([
      { id: 1, type: 'deposit', amount: 2000000, date: '2023-05-15', description: 'Nạp tiền từ ngân hàng' },
      { id: 2, type: 'purchase', amount: -1500000, date: '2023-05-10', description: 'Mua tour Đà Lạt' },
      { id: 3, type: 'deposit', amount: 3000000, date: '2023-04-28', description: 'Nạp tiền từ ví điện tử' },
      { id: 4, type: 'purchase', amount: -2000000, date: '2023-04-20', description: 'Mua tour Phú Quốc' },
    ]);
  
    const handleDeposit = () => {
        setShowModal(true)
    };

    const handlePayment = async () => {
        if (!amount){
            toast.error("Vui lòng nhập số tiền cần nạp!")
            return;
        }
        if (!user || !user.id) {
            toast.error("Không tìm thấy thông tin người dùng!")
            return;
        }
        
        setIsLoading(true);
        try {
          console.log('thanh toán: ', user.id);
          
          const result = await PaymentService.createPaymentIntent(user, amount, "Nạp tiền vào ví");
          console.log(result);
          setShowModal(false); // Đóng modal sau khi thành công
          setAmount(''); // Reset amount
          window.location.href = result;
          
        } catch (error) {
          console.error('Payment error:', error);
          toast.error('Có lỗi xảy ra khi tạo thanh toán!');
        } finally {
          setIsLoading(false);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setAmount(''); // Reset amount khi đóng modal
    };
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
  
    return (
      <div className="wallet-container">
        <div className="balance-section">
          <h2>Số dư hiện tại</h2>
          <div className="balance-amount">{formatCurrency(user?.balanceWallet)}</div>
          <button className="deposit-button" onClick={handleDeposit}>Nạp tiền</button>
        </div>
  
        <div className="tabs-section">
          <div 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            Tất cả
          </div>
          <div 
            className={`tab ${activeTab === 'deposit' ? 'active' : ''}`} 
            onClick={() => setActiveTab('deposit')}
          >
            Nạp tiền
          </div>
          <div 
            className={`tab ${activeTab === 'purchase' ? 'active' : ''}`} 
            onClick={() => setActiveTab('purchase')}
          >
            Mua tour
          </div>
        </div>
        <TransactionList transactions={transactions}/>
        <DepositModal 
          isOpen={showModal} 
          onClose={handleCloseModal}
          amount={amount}
          setAmount={setAmount}
          onConfirm={handlePayment}
          isLoading={isLoading}
        />
        </div>
    )
}

export default MyWallet
