import React from 'react';
import Helmet from 'react-helmet';

interface SeoProps {
  description: string;
  title: string;
}

function Seo({
  description = 'FlashLoL 소환사 검색을 통해 리그오브레전드 전적내역을 확인할 수 있어요!',
  title = 'Flash LoL',
}: SeoProps) {
  return (
    <Helmet>
      <meta name="description" content={description} data-react-helmet="true" />
      <title>{title}</title>

      <meta property="og:title" content={title} data-react-helmet="true" />
    </Helmet>
  );
}

export default Seo;
