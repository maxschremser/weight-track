export class Dataset {
  constructor(public label: string, public data?:number[]) {
    if (!data) {
      this.data = [];
    }
  }
}
