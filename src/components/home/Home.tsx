

import { Link } from "react-router-dom";
import { FiMonitor, FiFileText, FiArrowRight } from "react-icons/fi";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto pt-12 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Open'ailleurs
          </h1>
          <p className="text-xl text-gray-300">
            Explorez nos applications innovantes
          </p>
        </div>

        {/* Two Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Fake OS */}
          <Link
            to="/fake-os"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 sm:p-10">
              <div className="mb-6 inline-block p-4 bg-blue-600/20 rounded-xl group-hover:bg-blue-600/30 transition-colors">
                <FiMonitor className="text-blue-400" size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Fake OS
              </h2>
              <p className="text-gray-400 mb-6 line-clamp-3">
                Découvrez notre système d'exploitation simulé avec une interface interactive et fluide.
              </p>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="font-semibold">Explorer</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </div>
            </div>
          </Link>

          {/* Card 2: Complicated Form */}
          <Link
            to="/complicated-form"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 sm:p-10">
              <div className="mb-6 inline-block p-4 bg-cyan-600/20 rounded-xl group-hover:bg-cyan-600/30 transition-colors">
                <FiFileText className="text-cyan-400" size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Formulaire
              </h2>
              <p className="text-gray-400 mb-6 line-clamp-3">
                Remplissez notre formulaire complexe avec animations et validations sophistiquées.
              </p>
              <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span className="font-semibold">Essayer</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
