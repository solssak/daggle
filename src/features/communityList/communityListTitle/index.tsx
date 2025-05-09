import styles from './index.module.scss';
import { COMMUNITY_LIST_CONSTANTS } from '../constants';

export default function CommunityListTitle() {
  return (
    <div className={styles.container}>
      <h2 className={styles.container__subtitle}>
        {COMMUNITY_LIST_CONSTANTS.TITLE.SUBTITLE}
      </h2>
      <h1 className={styles.container__title}>
        {COMMUNITY_LIST_CONSTANTS.TITLE.MAIN.LINE1} <br />
        {COMMUNITY_LIST_CONSTANTS.TITLE.MAIN.LINE2}
      </h1>
    </div>
  );
}
