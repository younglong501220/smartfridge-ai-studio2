import { Ingredient, Recipe } from '../types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  // Produce (7 total, 4 selected)
  { id: 'p1', name: '番茄', category: 'produce', selected: true, freshnessDays: 3 },
  { id: 'p2', name: '洋蔥', category: 'produce', selected: true, freshnessDays: 7 },
  { id: 'p3', name: '菠菜', category: 'produce', selected: false, freshnessDays: 2 },
  { id: 'p4', name: '蒜頭', category: 'produce', selected: true, freshnessDays: 14 },
  { id: 'p5', name: '蘑菇', category: 'produce', selected: true, freshnessDays: 3 },
  { id: 'p6', name: '青花菜', category: 'produce', selected: false, freshnessDays: 4 },
  { id: 'p7', name: '胡蘿蔔', category: 'produce', selected: false, freshnessDays: 10 },

  // Proteins (5 total, 1 selected)
  { id: 'm1', name: '雞胸肉', category: 'proteins', selected: true, freshnessDays: 2 },
  { id: 'm2', name: '鮭魚排', category: 'proteins', selected: false, freshnessDays: 1 },
  { id: 'm3', name: '絞肉', category: 'proteins', selected: false, freshnessDays: 2 },
  { id: 'm4', name: '鮮蝦', category: 'proteins', selected: false, freshnessDays: 2 },
  { id: 'm5', name: '培根', category: 'proteins', selected: false, freshnessDays: 8 },

  // Dairy & Eggs (4 total, 2 selected)
  { id: 'd1', name: '雞蛋', category: 'dairy', selected: true, freshnessDays: 12 },
  { id: 'd2', name: '帕瑪森起司', category: 'dairy', selected: true, freshnessDays: 20 },
  { id: 'd3', name: '鮮奶', category: 'dairy', selected: false, freshnessDays: 5 },
  { id: 'd4', name: '希臘優格', category: 'dairy', selected: false, freshnessDays: 6 },

  // Staples (4 total, 1 selected)
  { id: 's1', name: '義大利麵', category: 'staples', selected: true, freshnessDays: 90 },
  { id: 's2', name: '白飯', category: 'staples', selected: false, freshnessDays: 2 },
  { id: 's3', name: '燕麥', category: 'staples', selected: false, freshnessDays: 60 },
  { id: 's4', name: '藜麥', category: 'staples', selected: false, freshnessDays: 60 },
];

export const INITIAL_CUSTOM_TAGS = ['橄欖油', '黑胡椒'];

export const PRIMARY_RECIPE: Recipe = {
  id: 'mediterranean-chicken',
  title: '地中海風香蒜洋蔥蘑菇嫩煎雞胸佐帕瑪森起司',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8p1hxogUuCLOP3YcUQMM2O7PUmrG4ZAWdZZdpsdjnUPE_AxE53kuKrEtEyhjUfpNT72pfLQ6rtzd_VOMb9TEIAYQoK3Ydq6My1HO3WYgjQx3fpod68eFZ94x3Ry3xIXwvC0-g_oeBOA1dSuWYe-EwNE8JcO_MYGdfTrhsGAF9iDisKXh86w73ocfAqSoywRUygenY8m__C_PQ105eyAJecus7f4uJFuUF6IoU-ciUrfvw9TwvJ_Lg',
  imageAlt: 'Gourmet Mediterranean style pan-seared chicken breast garnished with golden sautéed garlic cloves, button mushrooms, fresh parsley flakes and shaved parmesan cheese, served on an elegant warm rustic ceramic plate.',
  badges: ['主廚首選', '消耗高庫存'],
  prepTime: '30 分鐘快手',
  calories: '480 kcal',
  difficulty: '初級',
  dietTag: '低碳高蛋白',
  ingredients: [
    { name: '雞胸肉', amount: '200g', inFridge: true },
    { name: '洋蔥', amount: '1/2 顆', inFridge: true },
    { name: '蒜頭', amount: '3 瓣', inFridge: true },
    { name: '蘑菇', amount: '5 朵', inFridge: true },
    { name: '帕瑪森起司', amount: '15g', inFridge: true },
    { name: '橄欖油', amount: '少許', inFridge: true },
  ],
  steps: [
    {
      step: 1,
      highlight: '食材抓醃：',
      description: '雞胸肉切塊，以黑胡椒及少許鹽抓醃 5 分鐘。',
    },
    {
      step: 2,
      highlight: '熱鍋爆香：',
      description: '熱平底鍋倒入少許橄欖油，爆香蒜片與切絲洋蔥至金黃散發香氣。',
    },
    {
      step: 3,
      highlight: '嫩煎主料：',
      description: '下蘑菇翻炒至微軟，接著放入雞胸肉中火香煎至雙面微焦金黃。',
    },
    {
      step: 4,
      highlight: '點綴出鍋：',
      description: '起鍋前灑上現磨帕瑪森起司與黑胡椒，利用餘溫融化，即刻出鍋裝盤！',
    },
  ],
};

export const ALTERNATIVE_RECIPES: Recipe[] = [
  {
    id: 'tomato-egg-pasta',
    title: '經典義式番茄蒜香蛋花炒麵',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOIREdK06ERBNAEG9UpovP03tCGX_76pcLPBjnpLl2AlhfrK1IDuXDTQJeq3NiaPtoQ701kWauoTEcV-ysi4bJPJiO-rDKwndmLW0s0j5MboFEEi9SaREhgd_9wG67nfJc19C-KtFJXe_xaj6jTCi-VyLW88RMQh6gh1UWGutgW7GpvaO_scMGfGTJnPTRbop6BdvzJsJVouGa5W6kU46L3ZvN_UQUOFwTp-_iEJ8ie6NvaqKdVFtL',
    imageAlt: 'A warm bowl of Italian style garlic and tomato scrambled egg tossed pasta noodle dish, garnished with torn fresh basil on ceramic plate.',
    badges: ['快速省時', '高人氣'],
    prepTime: '15 分鐘快手',
    calories: '420 kcal',
    difficulty: '新手友善',
    dietTag: '均衡能量',
    consumesDescription: '消耗：番茄、雞蛋、蒜頭、麵',
    summaryTime: '15 分鐘',
    ingredients: [
      { name: '義大利麵', amount: '120g', inFridge: true },
      { name: '番茄', amount: '2 顆', inFridge: true },
      { name: '雞蛋', amount: '2 顆', inFridge: true },
      { name: '蒜頭', amount: '2 瓣', inFridge: true },
      { name: '橄欖油', amount: '1 大匙', inFridge: true },
      { name: '黑胡椒', amount: '少許', inFridge: true },
    ],
    steps: [
      {
        step: 1,
        highlight: '水煮麵條：',
        description: '大火滾水加少許鹽，煮義大利麵約 8 分鐘至八分熟撈起瀝乾。',
      },
      {
        step: 2,
        highlight: '嫩炒滑蛋：',
        description: '熱鍋少油將打散的雞蛋炒至 8 分熟金黃滑嫩，先盛出備用。',
      },
      {
        step: 3,
        highlight: '爆炒茄汁：',
        description: '原鍋加蒜碎爆香，加入切塊番茄炒至出汁軟爛，散發酸甜香氣。',
      },
      {
        step: 4,
        highlight: '拌炒收汁：',
        description: '放入煮好的麵條與滑蛋拌炒均勻，灑上黑胡椒即可熱騰騰上桌！',
      },
    ],
  },
  {
    id: 'mushroom-onion-omelette',
    title: '奶香蘑菇洋蔥歐姆蛋',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnAbe6udc240CBbc_w2XaiRZUu2Mzp0wWTcW0IJ8BeM90z3BlmZykWxYwboYf5Blj_BFLyQnvZtb1kp98_Cz8_FU8uoZdKvjvYzQnB-7UHvKTBD9uO3oqUuoLSZJclGLiy96pgvMJcJC8SGkfAPL5t72bs60QP98UZ9DUGjz3PZh2LwQeoqhEn3TsjbuGtGR6rl-ydMkx99uDLf-HY2oJWDyToX9WFzSgzLbx8JXkjiFxW8XEwbn9l',
    imageAlt: 'Fluffy golden French style creamy mushroom omelette sprinkled with finely grated parmesan and chives, displayed on soft sage green rustic tableware.',
    badges: ['高蛋白', '低醣早午餐'],
    prepTime: '10 分鐘快手',
    calories: '360 kcal',
    difficulty: '新手友善',
    dietTag: '生酮友好',
    consumesDescription: '消耗：雞蛋、蘑菇、洋蔥、起司',
    summaryTime: '10 分鐘',
    ingredients: [
      { name: '雞蛋', amount: '3 顆', inFridge: true },
      { name: '蘑菇', amount: '4 朵', inFridge: true },
      { name: '洋蔥', amount: '1/4 顆', inFridge: true },
      { name: '帕瑪森起司', amount: '20g', inFridge: true },
      { name: '橄欖油', amount: '少許', inFridge: true },
      { name: '黑胡椒', amount: '適量', inFridge: true },
    ],
    steps: [
      {
        step: 1,
        highlight: '切碎炒香：',
        description: '洋蔥與蘑菇切薄片，平底鍋加橄欖油炒香至軟嫩出水。',
      },
      {
        step: 2,
        highlight: '調製蛋液：',
        description: '雞蛋打勻，加入少許鹽與黑胡椒充分攪拌。',
      },
      {
        step: 3,
        highlight: '慢火烘煎：',
        description: '轉中小火倒入蛋液，鋪上炒好的蘑菇洋蔥與現磨起司。',
      },
      {
        step: 4,
        highlight: '對摺出鍋：',
        description: '待蛋液半熟呈金黃色時，輕柔對摺成半月形歐姆蛋，趁熱享用！',
      },
    ],
  },
];
