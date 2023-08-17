import styles from './blankCard.module.scss'

const BalnktCard = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay1}>
            <div className={styles.modal1}>
                {data()}
            </div>
        </div>
    );
};

export default BalnktCard;
