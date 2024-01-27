import { describe, expect, it } from '@jest/globals';
import { parseGameJson, parseTeamsJson } from './parse';

describe('parse', () => {
  describe.only('parseTeamsJson', () => {
    it('should have a test', () => {
      expect(parseTeamsJson('{}')).toEqual({});
    });
  });
});


describe('parse', () => {
  describe.only('parseGameJson', () => {
    it('should have a test', () => {
      expect(parseGameJson('{}')).toEqual({});
    });
  });
});

