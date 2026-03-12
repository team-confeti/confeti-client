type LottieAnimationAsset = {
  u?: string;
};

type LottieAnimationData<TAsset extends LottieAnimationAsset> = {
  assets: TAsset[];
};

export const clearLottieAssetBasePath = <
  TAnimationData extends LottieAnimationData<TAsset>,
  TAsset extends LottieAnimationAsset,
>(
  animationData: TAnimationData,
): TAnimationData => ({
  ...animationData,
  assets: animationData.assets.map((asset) => ({
    ...asset,
    u: '',
  })),
});
