import {
  EstimationOptions,
  EstimationResult,
  EstimationVariant,
} from './estimation.interface';
import { Logger } from '@nestjs/common';

interface VotingSetting {
  result: Record<EstimationVariant, string>;
  maxTimeToVoteS: number;
}

const votingSettings: Record<string, VotingSetting> = {
  'John Smith': {
    result: {
      fibonacci: '3',
      shirtSize: 'M',
    },
    maxTimeToVoteS: 20,
  },
  'Franz Xaver': {
    result: {
      fibonacci: '5',
      shirtSize: 'L',
    },
    maxTimeToVoteS: 15,
  },
  'Jane Doe': {
    result: {
      fibonacci: '8',
      shirtSize: 'S',
    },
    maxTimeToVoteS: 25,
  },
};

export class EstimationService {
  estimationVariant: EstimationVariant = 'fibonacci';
  logger = new Logger('EstimationService');
  votingStatus = {};
  startDate = Date.now();
  constructor() {}

  #resetVotes() {
    this.startDate = Date.now();
    for (const name in votingSettings) {
      this.votingStatus[name] = undefined;
    }
  }

  #updateVotingStatus() {
    const now = Date.now();
    const deltaTimeInS = (now - this.startDate) / 1000;
    for (const name in votingSettings) {
      if (this.votingStatus[name] === undefined) {
        if (deltaTimeInS > votingSettings[name].maxTimeToVoteS) {
          this.votingStatus[name] =
            votingSettings[name].result[this.estimationVariant];
        } else {
          if (
            Math.random() <
            deltaTimeInS / votingSettings[name].maxTimeToVoteS
          ) {
            this.votingStatus[name] =
              votingSettings[name].result[this.estimationVariant];
          }
        }
      }
    }
  }

  getResults(): EstimationResult[] {
    this.#updateVotingStatus();
    const result = [];
    for (const name in this.votingStatus) {
      result.push({
        name,
        result: this.votingStatus[name],
      });
    }
    return result;
  }

  startEstimation(options: EstimationOptions) {
    this.estimationVariant = options.variant;
    this.#resetVotes();
    this.logger.log(
      `Starting estimation with variant ${this.estimationVariant}`,
    );
  }
}
