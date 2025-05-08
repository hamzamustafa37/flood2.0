interface IFormData {
  issues: string[];
  zipCode: string;
  affectedAreas: string[];
  affectedSize: string;
  urgency: string;
  propertyType: string;
  additionalInfo: string;
  causes: string[];
  uploadedImage?: File | null;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  email: string;
}
