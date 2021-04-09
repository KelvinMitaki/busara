export interface Page {
  can_make_payments: boolean;
  created: string;
  depth: number;
  description: string;
  gateway: null | string;
  has_consent: boolean;
  id: number;
  is_active: boolean;
  is_primary: boolean;
  is_special: boolean;
  modified: string;
  name: string;
  node_type: string;
  numchild: number;
  path: string;
  sections: Section[];
  show_description: boolean;
  sort_order: number;
  status: string;
  survey_airtime_compensation: number;
  survey_cash_compensation: number;
  survey_estimated_time: number;
  type: string;
  universe: null | string;
  valid_from: string;
  valid_to: string;
  visibility: string;
}
export interface Section {
  can_make_payments: boolean;
  created: string;
  depth: number;
  description: string;
  gateway: null | string;
  has_consent: boolean;
  id: number;
  is_active: boolean;
  is_primary: boolean;
  is_special: boolean;
  modified: string;
  name: string;
  node_type: string;
  numchild: number;
  path: string;
  questions: Survey[];
  show_description: boolean;
  sort_order: number;
  status: string;
  survey_airtime_compensation: number;
  survey_cash_compensation: number;
  survey_estimated_time: number;
  type: string;
  universe: null | string;
  valid_from: string;
  valid_to: string;
  visibility: string;
}
export interface Survey {
  airtime_compensation: number;
  cash_compensation: number;
  column_match: string;
  created: string;
  default: string;
  description: string;
  detail: string;
  error_message: string;
  estimated_time: number;
  extras: { [key: string]: string };
  field_length: number;
  has_skip: boolean;
  id: number;
  is_active: boolean;
  is_enabled: boolean;
  is_mandatory: boolean;
  is_unique: boolean;
  is_unique_with: unknown[];
  is_visible: boolean;
  modified: string;
  q_options: { id: number; name: string; sort_order: number }[];
  sort_order: number;
  text: string;
  type: "text" | "tel" | "multiselect";
  uploads: {
    file_description: string;
    file_name: string;
    file_url: string;
    id: number;
  }[];
  validation_rule: string;
  widget: "article-image" | "multiselect" | "text" | "tel" | "select";
}

export interface Ans {
  column_match: string;
  q_ans: string | number;
  q_id: number;
}

export interface Submit {
  ans: Ans[];
  end_time: string;
  local_id: number;
  location: {
    accuracy: number;
    lat: number;
    lon: number;
  };
  start_time: string;
  survey_id: number;
}
