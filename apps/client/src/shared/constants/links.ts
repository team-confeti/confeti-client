export const EXTERNAL_LINKS = {
  NOTICE:
    'https://wonderful-celestite-e3c.notion.site/1fb210e281b0805d86e4f96441eef765?pvs=4',
  PRIVACY_POLICY:
    'https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9',
  TERMS_OF_SERVICE:
    'https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a',
} as const;

export const LINK_LABELS = {
  NOTICE: '공지사항',
  PRIVACY_POLICY: '개인정보처리방침',
  TERMS_OF_SERVICE: '이용약관',
} as const;

export const LINK_MAP: Record<string, string> = {
  [LINK_LABELS.TERMS_OF_SERVICE]: EXTERNAL_LINKS.TERMS_OF_SERVICE,
  [LINK_LABELS.PRIVACY_POLICY]: EXTERNAL_LINKS.PRIVACY_POLICY,
};
