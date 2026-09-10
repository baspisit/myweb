import { describe, expect, it } from 'vitest';
import { loadLabConfig } from '../../scripts/lab-monitor';

describe('Lab Cluster Monitor', () => {
  it('loads configuration and parses IPs correctly', () => {
    const config = loadLabConfig();
    expect(config.username).toBe('ps012');
    expect(config.ips.length).toBeGreaterThan(0);
    expect(config.ips).toContain('192.207.64.20');
    expect(config.ips).toContain('192.207.64.39');
  });
});
