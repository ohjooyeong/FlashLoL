import React from 'react';
import Helmet from 'react-helmet';

interface SeoProps {
  description: string;
  title: string;
  image?: string;
}

function Seo({
  description = 'FlashLoL 소환사 검색을 통해 리그오브레전드 전적내역을 확인할 수 있어요!',
  title = 'Flash LoL',
  image,
}: SeoProps) {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`${window.location.href}`} />
      <meta property="og:site_name" content="FlashLoL" />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
}

export default Seo;
