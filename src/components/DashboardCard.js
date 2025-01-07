import React, { useState, useEffect } from 'react';
import { Layers, BarChart, MessageCircle } from 'lucide-react';
const DashboardCard = () => {
    const [stats, setStats] = useState({
      categoriesCount: 0,
      sousCategoriesCount: 0,
      articlesCount: 0,
      messagesCount: 0,
    });
  
    useEffect(() => {
      // Fetch des données depuis l'API
      fetch('http://localhost:5000/api/dashboard-stats')
        .then((response) => response.json())
        .then((data) => setStats(data))
        .catch((error) => console.error('Erreur de récupération des données:', error));
    }, []);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Categories"
          value={stats.categoriesCount}
          trend="N/A"
          trendUp={false}
          description="Total des catégories."
          icon={Layers}
        />
        <DashboardCard
          title="Sous-Categories"
          value={stats.sousCategoriesCount}
          trend="N/A"
          trendUp={false}
          description="Total des sous-catégories."
          icon={BarChart}
        />
        <DashboardCard
          title="Articles"
          value={stats.articlesCount}
          trend="N/A"
          trendUp={false}
          description="Total des articles."
          icon={MessageCircle}
        />
        <DashboardCard
          title="Messages"
          value={stats.messagesCount}
          trend="N/A"
          trendUp={false}
          description="Total des messages."
          icon={MessageCircle}
        />
      </div>
    );
  };
  
export default DashboardCard;
