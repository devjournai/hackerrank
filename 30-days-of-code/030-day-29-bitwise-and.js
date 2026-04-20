function bitwiseAnd(N, K) {
  let candidate = K - 1;

  if ((candidate | K) <= N) {
    return candidate;
  } else {
    return K - 2;
  }
}
