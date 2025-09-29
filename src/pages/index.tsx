import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/api-integration/">
            快速开始
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <div className={styles.featureIcon}>🚁</div>
              <h3>SuperDock 自动机场</h3>
              <p>
                全自动无人机机场系统，支持自动起降、充电、数据传输等功能。
              </p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <div className={styles.featureIcon}>⚡</div>
              <h3>零学习成本集成</h3>
              <p>
                完全兼容DJI上云API，现有系统可直接对接，无需重新学习，大幅减少开发和培训成本。
              </p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <div className={styles.featureIcon}>🔧</div>
              <h3>开发者友好</h3>
              <p>
                完整的API文档、设备支持扩展指南和常见问题解答，让开发者轻松集成和定制功能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - SuperDock无人机自动机场开发者文档`}
      description="草莓创新SuperDock系列无人机自动机场开发者文档，完全兼容DJI上云API，支持零学习成本集成">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
