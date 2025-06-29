interface IFormData {
  issues: string[];
  zipCode: string;
  affectedAreas: string[];
  affectedSize: string;
  urgency: string;
  propertyType: string;
  additionalInfo: string;
  causes: string[];
  // uploadedImage?: File | null;
  ImageURL?: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  email: string;

  empId?: string;
  schedule?: {
    date: string;
    slot: {
      start: string;
      end: string;
    };
  };
}
