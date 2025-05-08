'use client';

import Image from 'next/image';
import { UserInfo } from '../types';
import styles from './index.module.scss';

export default function UserInformation({
  userId,
  nickname,
  profileImageUrl,
}: UserInfo) {
  return (
    <div className={styles.userInfo}>
      {userId ? (
        <>
          <Image
            src={profileImageUrl || '/images/community-list/profile.svg'}
            alt="profile"
            width={27}
            height={27}
          />
          <span>{nickname || '익명유저'} 님</span>
        </>
      ) : (
        <span>로그인이 필요합니다.</span>
      )}
    </div>
  );
}
