import { ICheckInsRepository } from "../repository/prismaRepository/prismaCheckinsRepository";

interface IGetUserMetricsRequest {
  id_user: string;
}

export class CheckinCountHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async CountByUserId({ id_user }: IGetUserMetricsRequest) {
    const checkinsMetric = await this.checkInsRepository.CountByUserId(id_user);

    return checkinsMetric;
  }
}
