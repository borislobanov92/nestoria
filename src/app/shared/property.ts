export class Property {
  id: number;
  constructor(public isInFavorites: boolean = false) {
    console.log('Property object created');
  }
}
