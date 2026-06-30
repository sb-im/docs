import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title" description="Homepage hero title (site name)">
            SuperDock开发者文档
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.tagline" description="Homepage hero tagline">
            无人机自动机场系统
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/api-integration/">
            <Translate id="homepage.hero.getStarted" description="Hero call-to-action button">
              快速开始
            </Translate>
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
              <h3>
                <Translate id="homepage.feature.dock.title" description="Feature card title">
                  SuperDock 自动机场
                </Translate>
              </h3>
              <p>
                <Translate id="homepage.feature.dock.desc" description="Feature card description">
                  全自动无人机机场系统，支持自动起降、充电、数据传输等功能。
                </Translate>
              </p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <div className={styles.featureIcon}>⚡</div>
              <h3>
                <Translate id="homepage.feature.integration.title" description="Feature card title">
                  零学习成本集成
                </Translate>
              </h3>
              <p>
                <Translate id="homepage.feature.integration.desc" description="Feature card description">
                  完全兼容DJI上云API，现有系统可直接对接，无需重新学习，大幅减少开发和培训成本。
                </Translate>
              </p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <div className={styles.featureIcon}>🔧</div>
              <h3>
                <Translate id="homepage.feature.devfriendly.title" description="Feature card title">
                  开发者友好
                </Translate>
              </h3>
              <p>
                <Translate id="homepage.feature.devfriendly.desc" description="Feature card description">
                  完整的API文档、设备支持扩展指南和常见问题解答，让开发者轻松集成和定制功能。
                </Translate>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'homepage.meta.title',
        description: 'Homepage browser tab/meta title',
        message: 'SuperDock开发者文档 - SuperDock无人机自动机场开发者文档',
      })}
      description={translate({
        id: 'homepage.meta.description',
        description: 'Homepage meta description',
        message:
          '草莓创新SuperDock系列无人机自动机场开发者文档，完全兼容DJI上云API，支持零学习成本集成',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
