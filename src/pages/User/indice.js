import Header from './../../components/pages/user/Indice/header';
import MapSection from './../../components/pages/user/Indice/map';
import Legend from './../../components/pages/user/Indice/legend';
import IndexButtons from './../../components/pages/user/Indice/IndexButton';
import Recommendations from './../../components/pages/user/Indice/recomendation';
import { TextProvider } from './../../context/TextContext';

const Indice = () => {
    return (
        <TextProvider>
            <div className="min-h-screen bg-white p-8">
                <Header />
                <div className="flex flex-col gap-12 mt-8">
                    <div className="flex gap-10 w-full pr-4">
                        <MapSection />
                        <IndexButtons />
                    </div>
                    <div className="flex gap-10 w-full pr-4">
                        <Legend/>
                        <Recommendations/>
                    </div>
                    
                </div>
            </div>

        </TextProvider>
    );
}
export default Indice ;