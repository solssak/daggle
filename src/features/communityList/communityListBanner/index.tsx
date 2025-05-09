'use client';
import styles from './index.module.scss';
import Image from 'next/image';
import { COMMUNITY_LIST_CONSTANTS } from '../constants';

export default function CommunityListBanner() {
  return (
    <div className={styles.container}>
      <section className={styles.container__wrapper}>
        {[
          ...COMMUNITY_LIST_CONSTANTS.BANNER.CARDS,
          ...COMMUNITY_LIST_CONSTANTS.BANNER.CARDS,
        ].map((card, idx) => (
          <div className={styles.container__wrapper__card} key={idx}>
            <Image
              className={styles.container__wrapper__card__imageWrapper}
              src={card.image}
              alt={card.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes={COMMUNITY_LIST_CONSTANTS.BANNER.IMAGE.SIZES}
              priority={idx < 4}
            />
            <div className={styles.container__wrapper__card__content}>
              <h2 className={styles.container__wrapper__card__content__title}>
                {card.title}
              </h2>
              <div className={styles.container__wrapper__card__content__bottom}>
                <p
                  className={
                    styles.container__wrapper__card__content__bottom__desc
                  }
                >
                  {card.desc}
                </p>
                <p
                  className={
                    styles.container__wrapper__card__content__bottom__subtitle
                  }
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
