import styles from './loader.module.scss'
import { DotLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <DotLoader  color="#36d7b7" size={150} />
        </div>
    );
};

export default Loader;