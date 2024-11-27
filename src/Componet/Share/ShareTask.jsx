import React, { useState, useCallback } from 'react';
import './ShareTask.scss';

const ShareModal = ({ title, about, onClose }) => {
    const [isCopied, setIsCopied] = useState(false);
    const generateTextToCopy = useCallback(() => `${title}\n${about}`, [title, about]);

    const handleCopyClick = useCallback(async () => {
        const textToCopy = generateTextToCopy();
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            console.log('Текст скопирован в буфер обмена!');
            onClose();
        } catch (error) {
            console.error('Ошибка при копировании текста: ', error);
        }
    }, [generateTextToCopy, onClose]);

    const handleModalClick = useCallback((event) => event.stopPropagation(), []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-share" onClick={handleModalClick}>
                <div className="modal-share-content">
                    <ShareButton 
                        icon="copy" 
                        onClick={handleCopyClick} 
                        alt="Копировать" 
                    />
                    <ShareButton icon="vk" alt="Поделиться в VK" />
                    <ShareButton icon="telegram" alt="Поделиться в Telegram" />
                    <ShareButton icon="whatsapp" alt="Поделиться в WhatsApp" />
                    <ShareButton icon="facebook" alt="Поделиться в Facebook" />
                </div>
                {isCopied && <p>Текст скопирован!</p>} {/* Сообщение о копировании */}
            </div>
        </div>
    );
};

const ShareButton = ({ icon, onClick, alt }) => {
    return (
        <button className="share-button" onClick={onClick}>
            <img src={`src/Icon/${icon}.png`} alt={alt} />
        </button>
    );
};

export default ShareModal;