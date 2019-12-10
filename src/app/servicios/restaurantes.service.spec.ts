import { TestBed } from '@angular/core/testing';

import { RestaurantesService } from './restaurantes.service';

describe('RestaurantesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantesService = TestBed.get(RestaurantesService);
    expect(service).toBeTruthy();
  });
});
