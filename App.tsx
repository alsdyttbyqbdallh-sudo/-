
import React, { useState, useMemo, useEffect } from 'react';
import type { AppSettings, Product, View, Message } from './types';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import EditControls from './components/EditControls';
import EditModal from './components/EditModal';
import MessageBox from './components/MessageBox';

const App: React.FC = () => {
    const [appData, setAppData] = useLocalStorage<{ settings: AppSettings; products: Product[] }>('appData', {
        settings: DEFAULT_SETTINGS,
        products: DEFAULT_PRODUCTS
    });

    const [view, setView] = useState<View>('list');
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [message, setMessage] = useState<Message | null>(null);
    
    // Temporary settings state while in edit mode
    const [tempSettings, setTempSettings] = useState<AppSettings>(appData.settings);

    useEffect(() => {
        setTempSettings(appData.settings);
    }, [appData.settings]);

    const handleSearch = (query: string) => {
        if (query === '333170') {
            setEditMode(true);
            setView('list');
            setSearchTerm('');
            return;
        }
        setSearchTerm(query);
    };

    const handleSelectProduct = (id: number) => {
        if (editMode) return;
        setSelectedProductId(id);
        setView('details');
    };

    const handleSaveChanges = () => {
        setAppData(prev => ({...prev, settings: tempSettings}));
        showMessage('تم الحفظ بنجاح!', 'success');
    };

    const handleBackFromEdit = () => {
        setEditMode(false);
        setTempSettings(appData.settings); // Revert changes if not saved
        setView('list');
    };

    const handleOpenEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleOpenAddModal = () => {
        const newProduct: Product = {
            id: Date.now(),
            name: '',
            number: String(appData.products.length + 556),
            price: 0,
            status: 'جديد',
            description: '',
            imageUrl: 'https://picsum.photos/seed/newProduct/100/100'
        };
        setEditingProduct(newProduct);
        setIsModalOpen(true);
    };

    const handleSaveProduct = (productToSave: Product) => {
        setAppData(prev => {
            const existingIndex = prev.products.findIndex(p => p.id === productToSave.id);
            if (existingIndex > -1) {
                const updatedProducts = [...prev.products];
                updatedProducts[existingIndex] = productToSave;
                return {...prev, products: updatedProducts};
            } else {
                return {...prev, products: [...prev.products, productToSave]};
            }
        });
        showMessage('تم حفظ المنتج بنجاح!', 'success');
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const handleDeleteProduct = (productId: number) => {
        setAppData(prev => ({
            ...prev,
            products: prev.products.filter(p => p.id !== productId)
        }));
        showMessage('تم حذف المنتج بنجاح!', 'success');
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const showMessage = (text: string, type: Message['type']) => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 2000);
    };
    
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return appData.products;
        return appData.products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.number.includes(searchTerm)
        );
    }, [searchTerm, appData.products]);
    
    const selectedProduct = useMemo(() => {
        return appData.products.find(p => p.id === selectedProductId) || null;
    }, [selectedProductId, appData.products]);
    
    const currentSettings = editMode ? tempSettings : appData.settings;

    return (
        <div className="bg-gray-100 flex justify-center items-start p-4 md:p-8 min-h-screen">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden min-h-[95vh] flex flex-col">
                <Header title={currentSettings.headerTitle} color={currentSettings.headerColor} />
                
                {!editMode && <SearchBar onSearch={handleSearch} />}

                <main className="flex-grow overflow-y-auto">
                    {view === 'list' && (
                       <ProductList
                           products={filteredProducts}
                           onProductClick={handleSelectProduct}
                           onEditClick={handleOpenEditModal}
                           isEditMode={editMode}
                       />
                    )}
                    {view === 'details' && selectedProduct && (
                        <ProductDetails
                            product={selectedProduct}
                            onBack={() => setView('list')}
                        />
                    )}
                    {editMode && (
                        <EditControls
                           settings={tempSettings}
                           onSettingsChange={setTempSettings}
                           onSave={handleSaveChanges}
                           onBack={handleBackFromEdit}
                           onAddNewProduct={handleOpenAddModal}
                        />
                    )}
                </main>
            </div>

            {editingProduct && (
                <EditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProduct}
                    onDelete={handleDeleteProduct}
                    product={editingProduct}
                    showMessage={showMessage}
                />
            )}
            <MessageBox message={message?.text} type={message?.type} isVisible={!!message} />
        </div>
    );
};

export default App;
