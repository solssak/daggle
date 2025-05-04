import styles from './index.module.scss';
import CommunityListBanner from './communityListBanner';
import CommunityListTitle from './communityListTitle';
import CommunityPostList from './communityPostList';

export default function CommunityList() {
  return (
    <div className={styles.container}>
      <CommunityListTitle />
      <CommunityListBanner />
      <CommunityPostList />
    </div>
  );
}
