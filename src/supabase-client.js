import {createClient} from '@supabase/supabase-js'

const supabaseUrl =  "https://dcamjoexfyorytircgre.supabase.co"
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjYW1qb2V4Znlvcnl0aXJjZ3JlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Njg5NDMyMSwiZXhwIjoyMDYyNDcwMzIxfQ.0DNhwtAG-Zv-MqAzwHEQAUmUa8AHfCGRsqrnXpoF_og"


const supabase = createClient(supabaseUrl , supabaseKey)

export default supabase