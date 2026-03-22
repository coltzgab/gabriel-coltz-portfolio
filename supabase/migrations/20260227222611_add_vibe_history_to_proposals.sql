ALTER TABLE proposals ADD COLUMN IF NOT EXISTS vibe_history JSONB DEFAULT '[]'::jsonb;
