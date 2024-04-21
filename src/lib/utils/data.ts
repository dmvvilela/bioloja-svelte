export const categories = [
	{
		slug: 'anatomia-e-fisiologia',
		name: 'Anatomia e Fisiologia Humana',
		subcategories: [
			{ name: 'Hematologia', slug: 'hematologia' },
			{ name: 'Sistema Circulatório', slug: 'sistema-circulatorio' },
			{ name: 'Sistema Digestório', slug: 'sistema-digestorio' },
			{ name: 'Sistema Endócrino', slug: 'sistema-endocrino' },
			{ name: 'Sistema Excretor', slug: 'sistema-excretor' },
			{ name: 'Sistema Nervoso', slug: 'sistema-nervoso' },
			{ name: 'Sistema Reprodutor', slug: 'sistema-reprodutor' },
			{ name: 'Sistema Respiratório', slug: 'sistema-respiratorio' },
			{ name: 'Sistema Sensorial', slug: 'sistema-sensorial' },
			{ name: 'Sistema Tegumentar', slug: 'sistema-tegumentar' },
			{ name: 'Sistemas de Sustentação', slug: 'sistemas-de-sustentacao' },
			{ name: 'Sistemas Imune e Linfático', slug: 'sistemas-imune-e-linfatico' },
			{ name: 'Outros', slug: 'outros' }
		]
	},
	{
		slug: 'seres-vivos',
		name: 'Seres Vivos',
		subcategories: [
			{ name: 'Microbiologia', slug: 'microbiologia' },
			{ name: 'Botânica', slug: 'botanica' },
			{ name: 'Zoologia', slug: 'zoologia' }
		]
	},
	{
		slug: 'promocoes',
		name: 'Promoções',
		subcategories: []
	},
	{
		slug: 'especiais',
		name: 'Especiais',
		subcategories: []
	},
	{
		slug: 'biologia-celular-e-molecular',
		name: 'Biologia Celular e Molecular',
		subcategories: []
	},
	{
		slug: 'bioquimica',
		name: 'Bioquímica',
		subcategories: []
	},
	{
		slug: 'ecologia',
		name: 'Ecologia',
		subcategories: []
	},
	{
		slug: 'embriologia',
		name: 'Embriologia',
		subcategories: []
	},
	{
		slug: 'evolucao',
		name: 'Evolução',
		subcategories: []
	},
	{
		slug: 'farmacologia',
		name: 'Farmacologia',
		subcategories: []
	},
	{
		slug: 'genetica',
		name: 'Genética',
		subcategories: []
	},
	{
		slug: 'histologia',
		name: 'Histologia',
		subcategories: []
	},
	{
		slug: 'imunologia',
		name: 'Imunologia',
		subcategories: []
	},
	{
		slug: 'parasitologia',
		name: 'Parasitologia',
		subcategories: []
	},
	{
		slug: 'patologia',
		name: 'Patologia',
		subcategories: []
	}
];

export const tags = [
	{ name: 'Apresentações', slug: 'apresentacoes' },
	{ name: 'Apostilas', slug: 'apostilas' },
	{ name: 'Atividades Extras', slug: 'atividades-extras' },
	{ name: 'Acompanha Vídeos', slug: 'acompanha-videos' },
	{ name: 'Ensino Médio', slug: 'ensino-medio' },
	{ name: 'Ensino Superior', slug: 'ensino-superior' },
	{ name: 'Super Promoções', slug: 'promocoes' }
];

export const attributes = [
	{ slug: 'anotacoes-do-apresentador', name: 'Anotações do apresentador', data_type: 'boolean' },
	{ slug: 'apostila-em-pdf', name: 'Apostila em PDF', data_type: 'boolean' },
	{ slug: 'atividades-extras', name: 'Atividades extras', data_type: 'boolean' },
	{ slug: 'gabarito-em-pdf', name: 'Gabarito em PDF', data_type: 'boolean' },
	{ slug: 'numero-de-paginas', name: 'Número de páginas', data_type: 'number' },
	{ slug: 'numero-de-slides', name: 'Número de slides', data_type: 'number' }
];
