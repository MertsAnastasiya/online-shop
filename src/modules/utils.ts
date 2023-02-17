import { IProduct } from './interfaces/product.interface';

export function requiresNonNullOrDefault<Type>(object: Type | null | undefined, defaultValue: Type): Type {
    return (object !== null && object !== undefined) ? object : defaultValue;
}

export const defaultProduct: IProduct = {
    id: 0,
    title: '',
    brand: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    category: '',
    thumbnail: '',
    images: [],
}

export const defaultImage: string = '../assets/img/defaultImage.svg';
