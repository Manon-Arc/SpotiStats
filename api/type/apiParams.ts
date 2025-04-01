enum Params {
  short = "short_term",
  medium = "medium_term",
  long = "long_term",
}

export type ApiParams = {
  limit?: number;
  offset?: number;
  time_range?: Params;
};
