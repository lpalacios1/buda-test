const request = require('supertest');
const app = require('../index'); 

let server;

describe('Buda API Routes', () => {
  beforeAll((done) => {
    server = app.listen(8081, done); 
  });

  afterAll((done) => {
    server.close(done); 

  });

  it('should return all markets on GET /api/markets', async () => {
    const res = await request(app).get('/api/markets');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('markets'); 
  });

  it('should return all spreads on GET /api/spreads', async () => {
    const res = await request(app).get('/api/spreads');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(spread => {
      expect(spread).toHaveProperty('market');
      expect(spread).toHaveProperty('spread');
      expect(spread).toHaveProperty('currency');
    });
  });

  it('should return spread for a specific market on GET /api/spread/:market_id', async () => {
    const marketId = 'BTC-CLP'; 
    const res = await request(app).get(`/api/spread/${marketId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('market', marketId);
    expect(res.body).toHaveProperty('spread');
    expect(res.body).toHaveProperty('currency');
  });

  it('should return 404 for a non-existing market on GET /api/spread/:market_id', async () => {
    const marketId = 'BTC-CNN'; 
    const res = await request(app).get(`/api/spread/${marketId}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should return 201 for a valid spread alert on POST /api/spread/alert/:market_id', async () => {
    const marketId = 'BTC-CLP';
    const spread = 1000;
    const res = await request(app).post(`/api/spread/alert/${marketId}`).send({ spread });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('mensaje', 'Alerta Guardada');
    expect(res.body).toHaveProperty('spread', spread);
    expect(res.body).toHaveProperty('marketid', marketId);
  });

  it('should return current spread and alert comparison on GET /api/spread/alert/:market_id', async () => {
    const marketId = 'BTC-CLP';
    const res = await request(app).get(`/api/spread/alert/${marketId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('currentSpread');
    expect(res.body).toHaveProperty('alertSpread');
    expect(res.body).toHaveProperty('isGreaterThanAlert');
    expect(res.body).toHaveProperty('isLessThanAlert');
  });

  it('should return 404 for a non-existing route', async () => {
    const res = await request(app).get('/api/invalid-route');
    expect(res.statusCode).toEqual(404);
  });


});
