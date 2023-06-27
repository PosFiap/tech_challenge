export interface IFaturaRepository {
  obterFaturaPeloId(id: number): Promise<any>
}
