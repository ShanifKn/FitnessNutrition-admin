export interface Products {
  _id: string;
  item_id: string;
  actual_available_stock: number;
  name: string;
  rate: number;

  // Optional properties
  __v?: number;
  account_id?: string;
  account_name?: string;
  available_stock?: number;
  cf_classification?: string;
  cf_classification_unformatted?: string;
  cf_component_type?: string;
  cf_component_type_unformatted?: string;
  cf_movemet_measure?: string;
  cf_movemet_measure_unformatted?: string;
  cf_storage_condition?: string;
  cf_storage_condition_unformatted?: string;
  cf_usage_unit?: string;
  cf_usage_unit_unformatted?: string;
  createdAt?: string; // ISO Date string
  created_time?: string; // ISO Date string
  description?: string;
  has_attachment?: boolean;
  is_linked_with_zohocrm?: boolean;
  is_taxable?: boolean;
  item_name?: string;
  item_type?: string;
  last_modified_time?: string; // ISO Date string
  pending?: boolean;
  product_type?: string;
  purchase_account_id?: string;
  purchase_account_name?: string;
  purchase_description?: string;
  purchase_rate?: number;
  reorder_level?: string;
  sku?: string;
  source?: string;
  status?: string;
  stock_on_hand?: number;
  tax_exemption_code?: string;
  tax_exemption_id?: string;
  tax_id?: string;
  tax_name?: string;
  tax_percentage?: number;
  unit?: string;
  updatedAt?: string; //
  zcrm_product_id?: string | null;
  additionalDescription?: string;
  chips?: string;
  visibility?: string;
  productCount?: number;
  productPrice?: number;
  images?: [string, string];
  maxDiscount?: number;
  parentCategory?: string;
  subCategory?: string;
  category?: string;
  analytics?: [string];
  paymentMethods?: [string];
  publishDate?: string;
  variants?: [string, string];
  additionals?: [string];
  rating?: string;
  dietary?: [];
}

export interface Variant {
  item_id: String; // Refers to the product collection
  products: VariantProduct[];
}

interface VariantProduct {
  product_id: string; // Refers to the product collection
  variantType: string;
  variants: string;
}
