INSERT INTO categories (id, name, color_hex) VALUES
  (1, 'Garbage', '#4CAF50') ON CONFLICT DO NOTHING;
INSERT INTO categories (id, name, color_hex) VALUES
  (2, 'Streetlight', '#FFC107') ON CONFLICT DO NOTHING;
INSERT INTO categories (id, name, color_hex) VALUES
  (3, 'Water Leak', '#2196F3') ON CONFLICT DO NOTHING;
INSERT INTO categories (id, name, color_hex) VALUES
  (4, 'Road Damage', '#9E9E9E') ON CONFLICT DO NOTHING;
INSERT INTO categories (id, name, color_hex) VALUES
  (5, 'Noise', '#E91E63') ON CONFLICT DO NOTHING;
