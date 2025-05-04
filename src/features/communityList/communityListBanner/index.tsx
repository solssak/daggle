'use client';
import styles from './index.module.scss';
import Image from 'next/image';

const cardData = [
  {
    title: '프린티',
    desc: '작가와 펜을 잇는 일러스트 출력 플랫폼',
    subtitle: '주식회사 프린티',
    image: '/images/community-list/Printi.png',
  },
  {
    title: 'G-Alpha',
    desc: '물류 관계자 비교견적 솔류션',
    subtitle: '(주)씨에어허브',
    image: '/images/community-list/G-alpha.png',
  },
  {
    title: 'KOSTA-EDU',
    desc: '학습관리 시스템',
    subtitle: '한국소프트웨어 기술진흥협회',
    image: '/images/community-list/Kosta.png',
  },
  {
    title: '달콤수학',
    desc: '엄마표 온라인 수학교육 강의 플랫폼',
    subtitle: '달콤교육',
    image: '/images/community-list/DalcomMath.png',
  },
];

export default function CommunityListBanner() {
  return (
    <div className={styles.container}>
      <section className={styles.container__wrapper}>
        {[...cardData, ...cardData].map((card, idx) => (
          <div className={styles.container__wrapper__card} key={idx}>
            <Image
              className={styles.container__wrapper__card__imageWrapper}
              src={card.image}
              alt={card.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="319px"
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
