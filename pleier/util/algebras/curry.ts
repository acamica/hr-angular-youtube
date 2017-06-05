export type ICurry1<A, B> = (a: A) => B;
export type ICurry2<A, B, C> = (a: A) => ((b: B) => C);
