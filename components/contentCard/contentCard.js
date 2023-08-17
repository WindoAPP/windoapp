import styles from './contentCard.module.scss'

const ContentCard = ({ isOpen, onClose, data, title }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h1 >{title}</h1>
                    <div className='position-relative'>
                    <i className={`fa fa-times-circle-o cursor-pointer ${styles.closeBtn}`} aria-hidden="true" onClick={onClose}></i>
                    </div>
                </div>
                <div className={styles.modalContent}>
                    {
                        data.map((obj) => {
                            return (
                                <div>
                                    <h5>{obj.heading}</h5>
                                    <p>{obj.des}</p>
                                </div>
                            )
                        })
                    }</div>
            </div>
        </div>
    );
};

export default ContentCard;
