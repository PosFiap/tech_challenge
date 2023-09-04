export interface IProcessaEventoPagamentoController {
  processaEvento(id: string, topic: string): Promise<void>
}
