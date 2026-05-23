export async function searchProducts(
  categorias: string,
): Promise<ProductSearchResponse> {
  const url = "https://world.openfoodfacts.org/api/v2/search";
  const params = new URLSearchParams({
    // brands_tags: "ferrero",
    categories_tags: categorias,
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    headers: { "User-Agent": "UNTDF TNT 2026" },
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data = await response.json();

  return data as ProductSearchResponse;
}

// ===================================================
// TYPES
// ===================================================

export interface ProductSearchResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
  skip: number;
}

export interface Product {
  _id: string;
  _keywords: string[];
  abbreviated_product_name_fr?: string;
  abbreviated_product_name_fr_imported?: string;
  added_countries_tags: any[];
  additives_n: number;
  additives_original_tags: string[];
  additives_tags: string[];
  allergens: string;
  allergens_from_ingredients: string;
  allergens_from_user: string;
  allergens_hierarchy: string[];
  allergens_imported?: string;
  allergens_lc?: AllergensLc;
  allergens_tags: string[];
  amino_acids_prev_tags?: any[];
  amino_acids_tags: any[];
  brands: string;
  brands_imported?: string;
  brands_old?: string;
  brands_tags: string[];
  carbon_footprint_from_known_ingredients_debug?: string;
  carbon_footprint_percent_of_known_ingredients?: number;
  categories: string;
  categories_hierarchy: string[];
  categories_imported?: string;
  categories_lc: AllergensLc;
  categories_old: string;
  categories_properties: CategoriesProperties;
  categories_properties_tags: string[];
  categories_tags: string[];
  category_properties?: CategoryProperties;
  checkers_tags: string[];
  ciqual_food_name_tags?: string[];
  cities_tags?: any[];
  code: string;
  codes_tags: string[];
  compared_to_category: string;
  complete: number;
  completeness: number;
  conservation_conditions_fr?: string;
  conservation_conditions_fr_imported?: string;
  correctors_tags: string[];
  countries: string;
  countries_beforescanbot?: string;
  countries_hierarchy: string[];
  countries_imported?: string;
  countries_lc: AllergensLc;
  countries_tags: string[];
  created_t: number;
  creator: string;
  customer_service_fr?: string;
  customer_service_fr_imported?: string;
  data_quality_bugs_tags: any[];
  data_quality_completeness_tags: string[];
  data_quality_dimensions: DataQualityDimensions;
  data_quality_errors_tags: any[];
  data_quality_info_tags: string[];
  data_quality_tags: string[];
  data_quality_warnings_tags: string[];
  data_sources: string;
  data_sources_imported?: string;
  data_sources_tags: string[];
  debug_param_sorted_langs?: string[];
  ecoscore_data: EcoscoreData;
  ecoscore_grade: EcoscoreGrade;
  ecoscore_score: number;
  ecoscore_tags: EcoscoreGrade[];
  editors?: string[];
  editors_tags: string[];
  emb_codes?: string;
  emb_codes_20141016?: string;
  emb_codes_orig?: string;
  emb_codes_tags?: string[];
  entry_dates_tags: string[];
  expiration_date?: string;
  food_groups: string;
  food_groups_tags: string[];
  "fruits-vegetables-nuts_100g_estimate"?: number;
  generic_name?: string;
  generic_name_en?: string;
  generic_name_fr?: string;
  generic_name_fr_imported?: string;
  generic_name_it?: string;
  id: string;
  image_front_small_url: string;
  image_front_thumb_url: string;
  image_front_url: string;
  image_small_url: string;
  image_thumb_url: string;
  image_url: string;
  images: Images;
  informers_tags: string[];
  ingredients: ProductIngredient[];
  ingredients_analysis: { [key: string]: string[] };
  ingredients_analysis_tags: string[];
  ingredients_debug?: Array<null | string>;
  ingredients_from_or_that_may_be_from_palm_oil_n?: number;
  ingredients_from_palm_oil_n?: number;
  ingredients_from_palm_oil_tags: string[];
  ingredients_hierarchy: string[];
  ingredients_ids_debug?: string[];
  ingredients_lc: AllergensLc;
  ingredients_n: number;
  ingredients_n_tags: string[];
  ingredients_non_nutritive_sweeteners_n: number;
  ingredients_original_tags: string[];
  ingredients_percent_analysis: number;
  ingredients_sweeteners_n: number;
  ingredients_tags: string[];
  ingredients_text: string;
  ingredients_text_debug?: string;
  ingredients_text_en?: string;
  ingredients_text_fr: string;
  ingredients_text_fr_imported?: string;
  ingredients_text_fr_ocr_1550242757?: string;
  ingredients_text_fr_ocr_1550242757_result?: string;
  ingredients_text_fr_ocr_1563617348?: string;
  ingredients_text_fr_ocr_1563617348_result?: string;
  ingredients_text_it?: string;
  ingredients_text_with_allergens: string;
  ingredients_text_with_allergens_en?: string;
  ingredients_text_with_allergens_fr: string;
  ingredients_text_with_allergens_it?: string;
  ingredients_that_may_be_from_palm_oil_n?: number;
  ingredients_that_may_be_from_palm_oil_tags: any[];
  ingredients_with_specified_percent_n: number;
  ingredients_with_specified_percent_sum: number;
  ingredients_with_unspecified_percent_n: number;
  ingredients_with_unspecified_percent_sum: number;
  ingredients_without_ciqual_codes: string[];
  ingredients_without_ciqual_codes_n: number;
  ingredients_without_ecobalyse_ids: string[];
  ingredients_without_ecobalyse_ids_n: number;
  interface_version_created: string;
  interface_version_modified: string;
  known_ingredients_n: number;
  labels: string;
  labels_hierarchy: string[];
  labels_imported?: string;
  labels_lc: AllergensLc;
  labels_old: string;
  labels_tags: string[];
  lang: AllergensLc;
  lang_imported?: AllergensLc;
  languages: { [key: string]: number };
  languages_codes: LanguagesCodes;
  languages_hierarchy: string[];
  languages_tags: string[];
  last_edit_dates_tags: string[];
  last_editor: string;
  last_image_dates_tags: string[];
  last_image_t: number;
  last_modified_by: string;
  last_modified_t: number;
  last_updated_t: number;
  lc: AllergensLc;
  lc_imported?: AllergensLc;
  link?: string;
  main_countries_tags: any[];
  manufacturing_places?: string;
  manufacturing_places_tags?: string[];
  max_imgid: number | string;
  minerals_prev_tags?: any[];
  minerals_tags: string[];
  misc_tags: string[];
  nova_group?: number;
  nova_group_debug: NovaGroupDebug;
  nova_groups?: string;
  nova_groups_markers?: { [key: string]: Array<string[]> };
  nova_groups_tags: NovaGroupsTag[];
  nucleotides_prev_tags?: any[];
  nucleotides_tags: any[];
  nutrient_levels: NutrientLevels;
  nutrient_levels_tags: string[];
  nutriments: Nutriments;
  nutriments_estimated?: { [key: string]: number };
  nutriscore: { [key: string]: Nutriscore };
  nutriscore_2021_tags: EcoscoreGrade[];
  nutriscore_2023_tags: EcoscoreGrade[];
  nutriscore_data: NutriscoreData;
  nutriscore_grade: EcoscoreGrade;
  nutriscore_grade_producer?: EcoscoreGrade;
  nutriscore_grade_producer_imported?: EcoscoreGrade;
  nutriscore_score: number;
  nutriscore_score_opposite: number;
  nutriscore_tags: EcoscoreGrade[];
  nutriscore_version: string;
  nutrition_data: Checked;
  nutrition_data_per: NutritionDataP;
  nutrition_data_per_imported?: NutritionDataP;
  nutrition_data_prepared_per: NutritionDataP;
  nutrition_data_prepared_per_imported?: NutritionDataP;
  nutrition_grade_fr: EcoscoreGrade;
  nutrition_grades: EcoscoreGrade;
  nutrition_grades_tags: EcoscoreGrade[];
  nutrition_score_beverage: number;
  nutrition_score_debug: string;
  nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients: number;
  nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value: number;
  nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients?: number;
  nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value?: number;
  obsolete?: string;
  obsolete_imported?: string;
  obsolete_since_date?: string;
  origin?: string;
  origin_en?: string;
  origin_fr?: string;
  origin_it?: string;
  origins: string;
  origins_hierarchy: string[];
  origins_lc: AllergensLc;
  origins_old?: OriginsOld;
  origins_tags: string[];
  other_nutritional_substances_prev_tags?: any[];
  other_nutritional_substances_tags: any[];
  owner?: Owner;
  owner_fields?: { [key: string]: number };
  owner_imported?: Owner;
  owners_tags?: Owner;
  packaging?: string;
  packaging_hierarchy?: string[];
  packaging_lc?: PackagingLc;
  packaging_materials_tags: string[];
  packaging_old?: string;
  packaging_old_before_taxonomization?: string;
  packaging_recycling_tags: PackagingRecyclingTag[];
  packaging_shapes_tags: string[];
  packaging_tags?: string[];
  packaging_text?: string;
  packaging_text_en?: string;
  packaging_text_fr?: string;
  packaging_text_it?: string;
  packagings: PackagingElement[];
  packagings_complete: number;
  packagings_materials: PackagingsMaterials;
  packagings_materials_main?: string;
  packagings_n?: number;
  photographers_tags: string[];
  pnns_groups_1: string;
  pnns_groups_1_tags: Status[];
  pnns_groups_2: string;
  pnns_groups_2_tags: string[];
  popularity_key: number;
  popularity_tags: string[];
  product_name: string;
  product_name_en?: string;
  product_name_fr: string;
  product_name_fr_imported?: string;
  product_name_it?: string;
  product_quantity: number;
  product_quantity_unit: QuantityUnit;
  product_type: ProductType;
  purchase_places?: string;
  purchase_places_tags?: string[];
  quantity: string;
  quantity_imported?: string;
  removed_countries_tags: any[];
  rev: number;
  scans_n: number;
  schema_version: number;
  selected_images: SelectedImages;
  serving_quantity?: number;
  serving_quantity_unit?: QuantityUnit;
  serving_size?: string;
  serving_size_imported?: string;
  sortkey?: number;
  sources?: Source[];
  sources_fields?: SourcesFields;
  states: string;
  states_hierarchy: string[];
  states_tags: string[];
  stores?: string;
  stores_tags?: string[];
  teams: string;
  teams_tags: string[];
  traces: string;
  traces_from_ingredients: string;
  traces_from_user: string;
  traces_hierarchy: string[];
  traces_imported?: string;
  traces_lc: AllergensLc;
  traces_tags: string[];
  unique_scans_n: number;
  unknown_ingredients_n: number;
  unknown_nutrients_tags: any[];
  update_key: UpdateKey;
  url: string;
  vitamins_prev_tags?: any[];
  vitamins_tags: string[];
  weighers_tags: string[];
  weighters_tags?: string[];
  completed_t?: number;
  generic_name_nl?: string;
  ingredients_text_nl?: string;
  ingredients_text_with_allergens_nl?: string;
  origin_nl?: string;
  packaging_text_nl?: string;
  product_name_nl?: string;
  abbreviated_product_name?: string;
  conservation_conditions?: string;
  customer_service?: string;
  environment_impact_level?: string;
  environment_impact_level_tags?: any[];
  generic_name_es?: string;
  grades?: Grades;
  ingredients_text_es?: string;
  ingredients_text_with_allergens_es?: string;
  origin_es?: string;
  packaging_imported?: string;
  packaging_text_es?: string;
  producer_version_id?: string;
  producer_version_id_imported?: string;
  product?: Grades;
  product_name_es?: string;
  scores?: Grades;
  checked?: Checked;
  debug_tags?: string[];
  last_check_dates_tags?: string[];
  last_checked_t?: number;
  last_checker?: string;
  specific_ingredients?: SpecificIngredient[];
  forest_footprint_data?: ForestFootprintData;
  ingredients_text_ar?: string;
  ingredients_text_ar_ocr_1732556310?: string;
  ingredients_text_ar_ocr_1732556310_result?: string;
  ingredients_text_with_allergens_ar?: string;
  nova_group_error?: string;
  nutrition_score_warning_no_fiber?: number;
  taxonomies_enhancer_tags?: string[];
  generic_name_vi?: string;
  ingredients_text_vi?: string;
  nutrition_score_warning_nutriments_estimated?: number;
  packaging_text_vi?: string;
  product_name_vi?: string;
  checkers?: any[];
  correctors?: string[];
  informers?: string[];
  photographers?: string[];
  generic_name_ar?: string;
  origin_ar?: string;
  packaging_text_ar?: string;
  product_name_ar?: string;
  generic_name_ro?: string;
  ingredients_text_debug_tags?: any[];
  ingredients_text_ro?: string;
  ingredients_text_with_allergens_ro?: string;
  origin_ro?: string;
  packaging_text_ro?: string;
  product_name_ro?: string;
  abbreviated_product_name_imported?: string;
  generic_name_zh?: string;
  ingredients_text_fr_ocr_1541863453?: string;
  ingredients_text_fr_ocr_1541863453_result?: string;
  ingredients_text_nl_ocr_1579630333?: string;
  ingredients_text_nl_ocr_1579630333_result?: string;
  ingredients_text_with_allergens_zh?: string;
  ingredients_text_zh?: string;
  manufacturing_places_imported?: string;
  no_nutrition_data_imported?: string;
  origin_fr_imported?: string;
  origin_zh?: string;
  packaging_text_fr_imported?: string;
  packaging_text_zh?: string;
  preparation?: string;
  preparation_fr?: string;
  preparation_fr_imported?: string;
  product_name_zh?: string;
  product_name_debug_tags?: any[];
}

export enum AllergensLc {
  Ar = "ar",
  En = "en",
  Fr = "fr",
}

export interface CategoriesProperties {
  "agribalyse_food_code:en"?: string;
  "ciqual_food_code:en"?: string;
  "agribalyse_proxy_food_code:en"?: string;
}

export interface CategoryProperties {
  "ciqual_food_name:en"?: string;
  "ciqual_food_name:fr"?: string;
}

export enum Checked {
  On = "on",
}

export interface DataQualityDimensions {
  accuracy: Accuracy;
  completeness: Completeness;
}

export interface Accuracy {
  overall: string;
}

export interface Completeness {
  general_information: string;
  ingredients: string;
  nutrition: string;
  overall: string;
  packaging: string;
}

export interface EcoscoreData {
  adjustments: Adjustments;
  agribalyse: Agribalyse;
  grade: EcoscoreGrade;
  grades: { [key: string]: EcoscoreGrade };
  missing?: Missing;
  missing_data_warning?: number;
  previous_data: PreviousData;
  score: number;
  scores: { [key: string]: number };
  status: Status;
  missing_key_data?: number;
}

export interface Adjustments {
  origins_of_ingredients: OriginsOfIngredients;
  packaging: AdjustmentsPackaging;
  production_system: ProductionSystem;
  threatened_species: ThreatenedSpecies;
}

export interface OriginsOfIngredients {
  aggregated_origins: AggregatedOrigin[];
  epi_score: number;
  epi_value: number;
  origins_from_categories: OriginsFromCategory[];
  origins_from_origins_field: string[];
  transportation_score: number;
  transportation_scores: { [key: string]: number };
  transportation_value: number;
  transportation_values: { [key: string]: number };
  value: number;
  values: { [key: string]: number };
  warning?: string;
}

export interface AggregatedOrigin {
  epi_score: number;
  origin: string;
  percent: number;
  transportation_score: number;
}

export enum OriginsFromCategory {
  EnUnknown = "en:unknown",
}

export interface AdjustmentsPackaging {
  non_recyclable_and_non_biodegradable_materials?: number;
  packagings?: PackagingElement[];
  score?: number;
  value: number;
  warning?: string;
}

export interface PackagingElement {
  environmental_score_material_score?: number;
  environmental_score_shape_ratio?: number;
  material?: string;
  non_recyclable_and_non_biodegradable?: FromPalmOil;
  number_of_units?: number | string;
  quantity_per_unit?: string;
  quantity_per_unit_unit?: Unit;
  quantity_per_unit_value?: number;
  recycling?: PackagingRecyclingTag;
  shape: string;
  weight_measured?: number;
  food_contact?: number;
}

export enum FromPalmOil {
  Maybe = "maybe",
  No = "no",
  Yes = "yes",
}

export enum Unit {
  Empty = "%",
  G = "g",
  KJ = "kJ",
  Number = "number",
}

export enum PackagingRecyclingTag {
  EnDiscard = "en:discard",
  EnRecycle = "en:recycle",
  EnRecycleInGlassBin = "en:recycle-in-glass-bin",
  EnRecycleInSortingBin = "en:recycle-in-sorting-bin",
}

export interface ProductionSystem {
  labels: Label[];
  value: number;
  warning?: string;
}

export enum Label {
  EnEuOrganic = "en:eu-organic",
  EnRainforestAlliance = "en:rainforest-alliance",
  FrAbAgricultureBiologique = "fr:ab-agriculture-biologique",
}

export interface ThreatenedSpecies {
  ingredient?: string;
  value?: number;
}

export interface Agribalyse {
  agribalyse_food_code?: string;
  co2_agriculture: number;
  co2_consumption: number;
  co2_distribution: number;
  co2_packaging: number;
  co2_processing: number;
  co2_total: number;
  co2_transportation: number;
  code: string;
  dqr: string;
  ef_agriculture: number;
  ef_consumption: number;
  ef_distribution: number;
  ef_packaging: number;
  ef_processing: number;
  ef_total: number;
  ef_transportation: number;
  is_beverage: number;
  name_en: string;
  name_fr: string;
  score: number;
  version: Version;
  agribalyse_proxy_food_code?: string;
}

export enum Version {
  The311 = "3.1.1",
  The32 = "3.2",
}

export enum EcoscoreGrade {
  A = "a",
  APlus = "a-plus",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
}

export interface Missing {
  packagings?: number;
  origins?: number;
  labels?: number;
}

export interface PreviousData {
  agribalyse: Agribalyse;
  grade: EcoscoreGrade;
  score: number;
}

export enum Status {
  Beverages = "beverages",
  CerealsAndPotatoes = "cereals-and-potatoes",
  FatAndSauces = "fat-and-sauces",
  Known = "known",
  MilkAndDairyProducts = "milk-and-dairy-products",
  SugarySnacks = "sugary-snacks",
}

export interface ForestFootprintData {
  footprint_per_kg: number;
  grade: EcoscoreGrade;
  ingredients: ForestFootprintDataIngredient[];
}

export interface ForestFootprintDataIngredient {
  conditions_tags: Array<string[]>;
  footprint_per_kg: number;
  matching_tag_id: string;
  percent: number;
  percent_estimate: number;
  processing_factor: number;
  tag_id: string;
  tag_type: string;
  type: Type;
}

export interface Type {
  deforestation_risk: number;
  name: string;
  soy_feed_factor: number;
  soy_yield: number;
}

export interface Grades {}

export interface Images {
  "1": The1;
  "2": The1;
  "3": The1;
  "4": The1;
  "5": The1;
  "6"?: The1;
  "7": The1;
  "8"?: The1;
  "9": The1;
  "10"?: The1;
  "11"?: The1;
  "12"?: The1;
  "13"?: The1;
  "14"?: The1;
  "15"?: The1;
  "16"?: The1;
  "17"?: The1;
  "18"?: The1;
  "19"?: The1;
  "20"?: The1;
  "21"?: The1;
  "26"?: The1;
  "27"?: The1;
  "28"?: The1;
  "29"?: The1;
  "30"?: The1;
  "32"?: The1;
  "33"?: The1;
  "34"?: The1;
  "35"?: The1;
  "36"?: The1;
  "37"?: The1;
  "38"?: The1;
  "39"?: The1;
  "40"?: The1;
  "41"?: The1;
  "42"?: The1;
  "43"?: The1;
  "44"?: The1;
  "45"?: The1;
  "46"?: The1;
  "47"?: The1;
  "48"?: The1;
  "49"?: The1;
  "50"?: The1;
  "51"?: The1;
  "52"?: The101;
  "53"?: The101;
  "54"?: The1;
  "61"?: The101;
  "62"?: The1;
  "63"?: The1;
  "64"?: The1;
  "65"?: The1;
  "66"?: The1;
  "67"?: The1;
  "68"?: The1;
  "69"?: The1;
  "70"?: The101;
  "71"?: The101;
  "72"?: The101;
  "73"?: The101;
  "74"?: The1;
  "75"?: The101;
  "76"?: The101;
  "77"?: The101;
  front_en?: FrontEn;
  front_fr: FrontEn;
  ingredients_en?: IngredientsEn;
  ingredients_fr: FrontEn;
  other_fr?: IngredientsEn;
  packaging_fr?: FrontEn;
  "22"?: The1;
  "23"?: The1;
  "24"?: The1;
  "25"?: The1;
  "31"?: The1;
  nutrition_fr?: FrontEn;
  "55"?: The1;
  "56"?: The1;
  "57"?: The1;
  "58"?: The1;
  "59"?: The1;
  "60"?: The1;
  "78"?: The101;
  "79"?: The101;
  "80"?: The101;
  "81"?: The101;
  "82"?: The101;
  "83"?: The1;
  "84"?: The1;
  "85"?: The1;
  "86"?: The1;
  "87"?: The101;
  "88"?: The1;
  "89"?: The1;
  "90"?: The101;
  "91"?: The101;
  "92"?: The101;
  "93"?: The1;
  "94"?: The1;
  "95"?: The101;
  "96"?: The1;
  "97"?: The1;
  "98"?: The1;
  "99"?: The1;
  "100"?: The1;
  "101"?: The101;
  "102"?: The101;
  "103"?: The101;
  "104"?: The101;
  "105"?: The101;
  "106"?: The101;
  front_es?: FrontAr;
  nutrition_en?: IngredientsEn;
  packaging_en?: FrontAr;
  front_ar?: FrontAr;
  nutrition_ar?: FrontAr;
  other_ar?: FrontAr;
  "107"?: The101;
  "108"?: The101;
  "109"?: The101;
  "110"?: The101;
  "111"?: The101;
  "112"?: The101;
  ingredients_ar?: FrontAr;
  front_nl?: FrontAr;
  front_zh?: FrontAr;
  ingredients_nl?: IngredientsEn;
  ingredients_zh?: FrontAr;
}

export interface The1 {
  sizes: Sizes;
  uploaded_t: number | string;
  uploader: string;
}

export interface Sizes {
  "100": The100;
  "400": The100;
  full: The100;
  "200"?: The100;
}

export interface The100 {
  h: number;
  w: number;
}

export interface The101 {
  sizes: Sizes;
  uploaded_t: number;
  uploader: string;
}

export interface FrontAr {
  imgid: string;
  rev: string;
  sizes: Sizes;
}

export interface FrontEn {
  imgid: number | string;
  rev: number | string;
  sizes: Sizes;
  coordinates_image_size?: string;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  angle?: number;
}

export interface IngredientsEn {
  angle?: number;
  imgid: string;
  rev: string;
  sizes: Sizes;
  coordinates_image_size?: string;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface ProductIngredient {
  ciqual_proxy_food_code?: string;
  ecobalyse_code?: string;
  id: string;
  is_in_taxonomy: number;
  percent?: number;
  percent_estimate: number;
  percent_max?: number;
  percent_min?: number;
  text: string;
  vegan?: FromPalmOil;
  vegetarian?: FromPalmOil;
  ciqual_food_code?: string;
  from_palm_oil?: FromPalmOil;
  labels?: Labels;
  ingredients?: PurpleIngredient[];
  origins?: string;
  processing?: string;
  quantity?: string;
  quantity_g?: number;
}

export interface PurpleIngredient {
  ciqual_food_code?: string;
  id: string;
  is_in_taxonomy: number;
  labels?: Labels;
  percent_estimate: number;
  percent_max?: number;
  percent_min?: number;
  text: string;
  vegan?: FromPalmOil;
  vegetarian?: FromPalmOil;
  ciqual_proxy_food_code?: string;
  ecobalyse_code?: string;
  ingredients?: FluffyIngredient[];
  from_palm_oil?: FromPalmOil;
  percent?: number;
  origins?: string;
}

export interface FluffyIngredient {
  id: string;
  is_in_taxonomy: number;
  percent_estimate: number;
  percent_max: number;
  percent_min: number;
  text: string;
}

export enum Labels {
  EnFairTradeEnOrganic = "en:fair-trade, en:organic",
  EnOrganic = "en:organic",
}

export interface LanguagesCodes {
  en?: number;
  fr: number;
  it?: number;
  nl?: number;
  es?: number;
  ar?: number;
  ro?: number;
  zh?: number;
}

export enum NovaGroupDebug {
  Empty = "",
  NoNovaGroupIfTooManyIngredientsAreUnknown13OutOf13 = "no nova group if too many ingredients are unknown: 13 out of 13",
}

export enum NovaGroupsTag {
  En1UnprocessedOrMinimallyProcessedFoods = "en:1-unprocessed-or-minimally-processed-foods",
  En3ProcessedFoods = "en:3-processed-foods",
  En4UltraProcessedFoodAndDrinkProducts = "en:4-ultra-processed-food-and-drink-products",
  Unknown = "unknown",
}

export interface NutrientLevels {
  fat: Fat;
  salt: Fat;
  "saturated-fat": Fat;
  sugars: Fat;
}

export enum Fat {
  High = "high",
  Low = "low",
  Moderate = "moderate",
}

export interface Nutriments {
  "added-sugars": number;
  "added-sugars_100g": number;
  "added-sugars_modifier"?: Modifier;
  "added-sugars_serving"?: number;
  "added-sugars_unit": Unit;
  "added-sugars_value": number;
  carbohydrates: number;
  carbohydrates_100g: number;
  carbohydrates_serving?: number;
  carbohydrates_unit: Unit;
  carbohydrates_value: number;
  energy: number;
  "energy-kcal": number;
  "energy-kcal_100g": number;
  "energy-kcal_serving"?: number;
  "energy-kcal_unit": EnergyKcalUnit;
  "energy-kcal_value": number;
  "energy-kj": number;
  "energy-kj_100g": number;
  "energy-kj_serving"?: number;
  "energy-kj_unit": Unit;
  "energy-kj_value": number;
  energy_100g: number;
  energy_serving?: number;
  energy_unit: Unit;
  energy_value: number;
  fat: number;
  fat_100g: number;
  fat_serving?: number;
  fat_unit: Unit;
  fat_value: number;
  fiber?: number;
  fiber_100g?: number;
  fiber_serving?: number;
  fiber_unit?: Unit;
  fiber_value?: number;
  "fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
  "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number;
  "nova-group"?: number;
  "nova-group_100g"?: number;
  "nova-group_serving"?: number;
  "nova-group_unit"?: string;
  "nova-group_value"?: number;
  proteins: number;
  proteins_100g: number;
  proteins_serving?: number;
  proteins_unit: Unit;
  proteins_value: number;
  salt: number;
  salt_100g: number;
  salt_serving?: number;
  salt_unit: Unit;
  salt_value: number;
  "saturated-fat": number;
  "saturated-fat_100g": number;
  "saturated-fat_serving"?: number;
  "saturated-fat_unit": Unit;
  "saturated-fat_value": number;
  sodium: number;
  sodium_100g: number;
  sodium_serving?: number;
  sodium_unit: Unit;
  sodium_value: number;
  sugars: number;
  sugars_100g: number;
  sugars_serving?: number;
  sugars_unit: Unit;
  sugars_value: number;
  iron?: number;
  iron_100g?: number;
  iron_serving?: number;
  iron_unit?: Unit;
  iron_value?: number;
  magnesium?: number;
  magnesium_100g?: number;
  magnesium_serving?: number;
  magnesium_unit?: Unit;
  magnesium_value?: number;
  choline?: number;
  choline_100g?: number;
  choline_unit?: Unit;
  choline_value?: number;
  "energy-kj_modifier"?: Modifier;
  energy_modifier?: Modifier;
  starch?: number;
  starch_100g?: number;
  starch_unit?: Unit;
  starch_value?: number;
  caffeine?: number;
  caffeine_100g?: number;
  caffeine_serving?: number;
  caffeine_unit?: Unit;
  caffeine_value?: number;
  calcium?: number;
  calcium_100g?: number;
  calcium_serving?: number;
  calcium_unit?: Unit;
  calcium_value?: number;
  choline_serving?: number;
  copper?: number;
  copper_100g?: number;
  copper_serving?: number;
  copper_unit?: Unit;
  copper_value?: number;
  manganese?: number;
  manganese_100g?: number;
  manganese_serving?: number;
  manganese_unit?: Unit;
  manganese_value?: number;
  phosphorus?: number;
  phosphorus_100g?: number;
  phosphorus_serving?: number;
  phosphorus_unit?: Unit;
  phosphorus_value?: number;
  potassium?: number;
  potassium_100g?: number;
  potassium_serving?: number;
  potassium_unit?: Unit;
  potassium_value?: number;
  selenium?: number;
  selenium_100g?: number;
  selenium_serving?: number;
  selenium_unit?: Unit;
  selenium_value?: number;
  starch_serving?: number;
  "vitamin-a"?: number;
  "vitamin-a_100g"?: number;
  "vitamin-a_serving"?: number;
  "vitamin-a_unit"?: Unit;
  "vitamin-a_value"?: number;
  "vitamin-b1"?: number;
  "vitamin-b12"?: number;
  "vitamin-b12_100g"?: number;
  "vitamin-b12_serving"?: number;
  "vitamin-b12_unit"?: Unit;
  "vitamin-b12_value"?: number;
  "vitamin-b1_100g"?: number;
  "vitamin-b1_serving"?: number;
  "vitamin-b1_unit"?: Unit;
  "vitamin-b1_value"?: number;
  "vitamin-b2"?: number;
  "vitamin-b2_100g"?: number;
  "vitamin-b2_serving"?: number;
  "vitamin-b2_unit"?: Unit;
  "vitamin-b2_value"?: number;
  "vitamin-b6"?: number;
  "vitamin-b6_100g"?: number;
  "vitamin-b6_serving"?: number;
  "vitamin-b6_unit"?: Unit;
  "vitamin-b6_value"?: number;
  "vitamin-c"?: number;
  "vitamin-c_100g"?: number;
  "vitamin-c_serving"?: number;
  "vitamin-c_unit"?: Unit;
  "vitamin-c_value"?: number;
  "vitamin-e"?: number;
  "vitamin-e_100g"?: number;
  "vitamin-e_serving"?: number;
  "vitamin-e_unit"?: Unit;
  "vitamin-e_value"?: number;
  "vitamin-k"?: number;
  "vitamin-k_100g"?: number;
  "vitamin-k_serving"?: number;
  "vitamin-k_unit"?: Unit;
  "vitamin-k_value"?: number;
  zinc?: number;
  zinc_100g?: number;
  zinc_serving?: number;
  zinc_unit?: Unit;
  zinc_value?: number;
  sodium_modifier?: Modifier;
  "alpha-linolenic-acid"?: number;
  "alpha-linolenic-acid_100g"?: number;
  "alpha-linolenic-acid_serving"?: number;
  "alpha-linolenic-acid_unit"?: Unit;
  "alpha-linolenic-acid_value"?: number;
  "linoleic-acid"?: number;
  "linoleic-acid_100g"?: number;
  "linoleic-acid_serving"?: number;
  "linoleic-acid_unit"?: Unit;
  "linoleic-acid_value"?: number;
  "monounsaturated-fat"?: number;
  "monounsaturated-fat_100g"?: number;
  "monounsaturated-fat_serving"?: number;
  "monounsaturated-fat_unit"?: Unit;
  "monounsaturated-fat_value"?: number;
  "oleic-acid"?: number;
  "oleic-acid_100g"?: number;
  "oleic-acid_serving"?: number;
  "oleic-acid_unit"?: Unit;
  "oleic-acid_value"?: number;
  "polyunsaturated-fat"?: number;
  "polyunsaturated-fat_100g"?: number;
  "polyunsaturated-fat_serving"?: number;
  "polyunsaturated-fat_unit"?: Unit;
  "polyunsaturated-fat_value"?: number;
  "fruits-vegetables-nuts"?: number;
  "fruits-vegetables-nuts_100g"?: number;
  "fruits-vegetables-nuts_serving"?: number;
  "fruits-vegetables-nuts_unit"?: Unit;
  "fruits-vegetables-nuts_value"?: number;
}

export enum Modifier {
  Empty = "~",
}

export enum EnergyKcalUnit {
  Kcal = "kcal",
}

export interface Nutriscore {
  category_available: number;
  data: Data;
  estimated: number;
  grade: EcoscoreGrade;
  nutrients_available: number;
  nutriscore_applicable: number;
  nutriscore_computed: number;
  preparation: Preparation;
  score: number;
}

export interface Data {
  energy?: number;
  energy_points?: number;
  energy_value?: number;
  fiber?: number;
  fiber_points?: number;
  fiber_value?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
  is_beverage: number;
  is_cheese: number;
  is_fat?: number;
  is_water: number;
  negative_points: number;
  positive_points: number;
  proteins?: number;
  proteins_points?: number;
  proteins_value?: number;
  saturated_fat?: number;
  saturated_fat_points?: number;
  saturated_fat_value?: number;
  sodium?: number;
  sodium_points?: number;
  sodium_value?: number;
  sugars?: number;
  sugars_points?: number;
  sugars_value?: number;
  fat?: number;
  saturated_fat_ratio?: number;
  saturated_fat_ratio_points?: number;
  saturated_fat_ratio_value?: number;
  components?: Components;
  count_proteins?: number;
  count_proteins_reason?: CountProteinsReason;
  is_fat_oil_nuts_seeds?: number;
  is_red_meat_product?: number;
  negative_points_max?: number;
  positive_nutrients?: PositiveNutrient[];
  positive_points_max?: number;
  grade?: EcoscoreGrade;
  score?: number;
}

export interface Components {
  negative: Tive[];
  positive: Tive[];
}

export interface Tive {
  id: PositiveNutrient;
  points: number;
  points_max: number;
  unit: Unit;
  value: number | null;
}

export enum PositiveNutrient {
  Energy = "energy",
  EnergyFromSaturatedFat = "energy_from_saturated_fat",
  Fiber = "fiber",
  FruitsVegetablesLegumes = "fruits_vegetables_legumes",
  NonNutritiveSweeteners = "non_nutritive_sweeteners",
  Proteins = "proteins",
  Salt = "salt",
  SaturatedFat = "saturated_fat",
  SaturatedFatRatio = "saturated_fat_ratio",
  Sugars = "sugars",
}

export enum CountProteinsReason {
  Beverage = "beverage",
  NegativePointsGreaterThanOrEqualTo11 = "negative_points_greater_than_or_equal_to_11",
  NegativePointsGreaterThanOrEqualTo7 = "negative_points_greater_than_or_equal_to_7",
  NegativePointsLessThan11 = "negative_points_less_than_11",
  NegativePointsLessThan7 = "negative_points_less_than_7",
}

export enum Preparation {
  AsSold = "as_sold",
}

export interface NutriscoreData {
  components: Components;
  count_proteins: number;
  count_proteins_reason: CountProteinsReason;
  is_beverage: number;
  is_cheese: number;
  is_fat_oil_nuts_seeds: number;
  is_red_meat_product: number;
  is_water: number;
  negative_points: number;
  negative_points_max: number;
  positive_nutrients: PositiveNutrient[];
  positive_points: number;
  positive_points_max: number;
  grade?: EcoscoreGrade;
  score?: number;
}

export enum NutritionDataP {
  The100G = "100g",
  The100Ml = "100ml",
}

export enum OriginsOld {
  Biologique = "biologique",
  ChineÉquateur = "Chine,Équateur",
  Empty = "",
  UnionEuropéenne = "Union Européenne",
}

export enum Owner {
  OpenfoodCh = "openfood-ch",
  OrgEthiquable = "org-ethiquable",
  OrgLaBoulangere = "org-la-boulangere",
  OrgLaBoulangereCo = "org-la-boulangere-co",
  OrgLeaNature = "org-lea-nature",
  OrgNestleFrance = "org-nestle-france",
}

export enum PackagingLc {
  En = "en",
  Es = "es",
  Fr = "fr",
  Pt = "pt",
}

export interface PackagingsMaterials {
  all?: All;
  "en:plastic"?: All;
  "en:unknown"?: Grades;
  "en:paper-or-cardboard"?: Grades;
  "en:glass"?: Grades;
  "en:metal"?: All;
}

export interface All {
  weight?: number;
  weight_100g?: number;
  weight_percent?: number;
}

export enum QuantityUnit {
  G = "g",
  Ml = "ml",
}

export enum ProductType {
  Food = "food",
}

export interface SelectedImages {
  front: Front;
}

export interface Front {
  display: Display;
  small: Display;
  thumb: Display;
}

export interface Display {
  en?: string;
  fr: string;
  es?: string;
  ar?: string;
  nl?: string;
  zh?: string;
}

export interface Source {
  fields: string[];
  id: Owner;
  images: any[];
  import_t: number;
  manufacturer: number | string;
  name: Name;
  url: null | string;
  source_licence?: string;
  source_licence_url?: string;
}

export enum Name {
  Ethiquable = "ethiquable",
  FoodRepo = "FoodRepo",
  LaBoulangere = "la-boulangere",
  LaBoulangereCo = "la-boulangere-co",
  LeaNature = "lea-nature",
  NestleFrance = "nestle-france",
}

export interface SourcesFields {
  "org-gs1": OrgGs1;
}

export interface OrgGs1 {
  gln: string;
  gpcCategoryCode: string;
  gpcCategoryName: string;
  isAllergenRelevantDataProvided: string;
  lastChangeDateTime: Date;
  partyName: string;
  productionVariantDescription: string;
  publicationDateTime: Date;
}

export interface SpecificIngredient {
  id: string;
  ingredient: string;
  label: string;
  origins: string;
}

export enum UpdateKey {
  Brands = "brands",
  NewNutrition = "new-nutrition",
}
