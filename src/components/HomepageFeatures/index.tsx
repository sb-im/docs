import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'SuperDock 自动机场',
    icon: '🏭',
    description: (
      <>
        Pro V4、Mini 2、Pro 三大系列自动机场，支持DJI全系列无人机，
        提供自动起降、充电换电、环境监控等完整功能。
      </>
    ),
  },
  {
    title: '无限跳飞技术',
    icon: '🚁',
    description: (
      <>
        独创的多机场协调技术，支持无人机在机场间无限跳飞，
        大幅扩展巡检范围，实现超远距离自动化作业。
      </>
    ),
  },
  {
    title: 'AI 智能识别',
    icon: '🤖',
    description: (
      <>
        内置AI识别引擎，自动识别人员、车辆、设备异常，
        支持自定义模型训练，识别准确率超过95%。
      </>
    ),
  },
  {
    title: 'DJI API 兼容',
    icon: '🔗',
    description: (
      <>
        完全兼容DJI上云API，支持现有系统无缝迁移，
        提供标准RESTful接口，轻松实现第三方集成。
      </>
    ),
  },
  {
    title: '全天候作业',
    icon: '🌤️',
    description: (
      <>
        内置气象站和环境监控，自动判断飞行条件，
        支持恶劣天气下的安全作业，确保任务连续性。
      </>
    ),
  },
  {
    title: '行业解决方案',
    icon: '🏗️',
    description: (
      <>
        覆盖电网、交通、油气、工业等多个行业，
        提供定制化解决方案，满足不同场景需求。
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="card">
        <div className={styles.iconContainer}>
          <span className={styles.featureIcon}>{icon}</span>
        </div>
        <div className="card__body">
          <Heading as="h3" className={styles.title}>
            {title}
          </Heading>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            为什么选择草莓创新？
          </Heading>
          <p className={styles.featuresSubtitle}>
            草莓创新提供全程无人化的自动巡检解决方案，助力各行业实现智能化升级
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
