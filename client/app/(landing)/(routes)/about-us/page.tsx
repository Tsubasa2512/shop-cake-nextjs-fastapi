'use client';
import IntroAbout from '@/components/client/about/intro';
import HistoryTimeline from '@/components/client/about/history-time-line';
import Team from '@/components/client/about/our-team';
import BannerProduct from '@/components/client/about/banner-product';
import MessageAbout from '@/components/client/about/message';
export default function AboutUs() {
  return (
    <main>
      <IntroAbout />
      <HistoryTimeline />
      <BannerProduct />
      <Team />
      <MessageAbout />
    </main>
  );
}
