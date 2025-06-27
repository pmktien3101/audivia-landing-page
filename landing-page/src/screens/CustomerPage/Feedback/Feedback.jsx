import React, { useState } from 'react';
import { ImageUploader } from '../../../components/ImageUploader/ImageUploader';
import './style.css';
import { FiHeart } from 'react-icons/fi';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUploaded = (url) => {
    setImages((prev) => [...prev, url]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setContent('');
    setImages([]);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="feedback-outer-wrapper feedback-gradient-bg">
      <div className="feedback-2col-container feedback-wide">
        <div className="feedback-left">
          <div className="feedback-welcome">
            <h2>Xin chào bạn! 👋</h2>
            <p>
              Tụi mình là một <b>startup trẻ</b> với rất nhiều đam mê và nhiệt huyết, nhưng chắc chắn vẫn còn nhiều thiếu sót trong quá trình phát triển ứng dụng này.<br/><br/>
              Mỗi góp ý, chia sẻ của bạn đều là động lực và kim chỉ nam để tụi mình hoàn thiện sản phẩm tốt hơn mỗi ngày.<br/><br/>
              Rất mong nhận được sự đóng góp chân thành từ bạn!<br/>
              <span style={{fontSize: '1.3em'}}>Cảm ơn bạn rất nhiều! <FiHeart/></span>
            </p>
          </div>
        </div>
        <div className="feedback-right">
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="feedback-title">
              <span role="img" aria-label="chat">💬</span>
              <h2>Chia sẻ ý kiến của bạn</h2>
            </div>
            <p className="feedback-desc">Có ý tưởng hoặc góp ý? Chúng mình luôn lắng nghe bạn!</p>
            <input
              type="text"
              placeholder="Tên của bạn (không bắt buộc)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="feedback-input"
            />
            <input
              type="email"
              placeholder="Email (không bắt buộc)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="feedback-input"
            />
            <textarea
              placeholder="Viết góp ý của bạn..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="feedback-textarea"
              required
            />
            <div className="feedback-upload">
              <ImageUploader onImageUploaded={handleImageUploaded} />
              <div className="feedback-images-preview">
                {images.map((url, idx) => (
                  <img key={idx} src={url} alt={`feedback-img-${idx}`} className="feedback-img-thumb" />
                ))}
              </div>
            </div>
            <button type="submit" className="feedback-btn">
              Gửi góp ý
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
