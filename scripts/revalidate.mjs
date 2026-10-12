const isProd = process.argv.includes('--prod');
const baseUrl = isProd
  ? 'https://keralacoderscafe.in'
  : (process.env.LOCAL_URL || 'http://localhost:3000');

const targetUrl = `${baseUrl}/api/revalidate`;

console.log(`\n🔄 Triggering on-demand cache revalidation at: ${targetUrl}...`);

try {
  const res = await fetch(targetUrl);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  console.log('✅ Revalidation successful!');
  console.log('Response:', JSON.stringify(data, null, 2));
  console.log('\n✨ All cached jobs and blogs have been refreshed on demand!\n');
} catch (error) {
  console.error('❌ Failed to revalidate:', error.message);
  if (!isProd) {
    console.log('💡 Tip: Make sure your Next.js local dev server is running on http://localhost:3000 (npm run dev).');
    console.log('💡 Or run with --prod to revalidate your live production site: npm run revalidate:prod\n');
  }
}
