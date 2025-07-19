import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTestSeries, fetchTestSeries } from '../../app/slices/testSeriesSlice';
import { AppDispatch, RootState } from '../../app/store'; // adjust this path
import CommonModal from '../CommonModal';
import CreateNewTest from './CreateNewTest';
import ConfirmDialog from '../ConfirmDialog';

const ManageTestSeries: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.testSeries
  );
  const [testSeries,setTestSeries] = useState(items || [])
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

// Show confirmation
const handleDelete = (id: string) => {
  setDeleteTargetId(id);
  setConfirmOpen(true);
};

// Actual delete logic (replace with your delete API call)
const confirmDelete = async () => {
  if (!deleteTargetId) return;
  try {
    await dispatch(deleteTestSeries(deleteTargetId)).unwrap();
    setTestSeries(prev => prev.filter(item => item._id !== deleteTargetId));
    await loadTestSeries();

  } catch (error) {
    console.error("Delete failed:", error);
  } finally {
    setConfirmOpen(false);
    setDeleteTargetId(null);
  }
};

const loadTestSeries = async () => {
  try {
    const resultAction = await dispatch(fetchTestSeries()).unwrap();
    setTestSeries(resultAction); 
  } catch (err) {
    console.error('Error fetching test series:', err);
  }
};

  useEffect(() => {
    loadTestSeries();
  }, [dispatch]);

  const handleEdit = (test: any) => {
    setSelectedTest(test);
    setIsEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📋 Manage Test Series</h2>

      {loading ? (
        <p className="text-gray-500">Loading test series...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : testSeries.length === 0 ? (
        <p className="text-gray-500">No test series found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border rounded-lg shadow text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="p-3">Title</th>
                <th className="p-3">Audience</th>
                <th className="p-3">Skill</th>
                <th className="p-3">Time Limit</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testSeries.map((test:any) => (
                <tr key={test._id} className="border-t hover:bg-gray-100">
                  <td className="p-3">{test.title}</td>
                  <td className="p-3 capitalize">{test.audience}</td>
                  <td className="p-3">{test.skillTag || '-'}</td>
                  <td className="p-3">{test.timeLimit} min</td>
                  <td className="p-3">{new Date(test.startDate).toLocaleString()}</td>
                  <td className="p-3">{new Date(test.endDate).toLocaleString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(test)}
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs shadow"
                    >
                      ✏️ <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(test._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs shadow"
                    >
                      🗑️ <span>Delete</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        <CommonModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedTest(null);
            setIsEditing(false);
          }}
          title={isEditing ? "Edit Test Series" : "Create New Test"}
        >
          <CreateNewTest
            onClose={() => {
              setModalOpen(false);
              setSelectedTest(null);
              setIsEditing(false);
              loadTestSeries()
            }}
            initialData={selectedTest}
            isEditing={isEditing}
          />
        </CommonModal>

        <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Test Series"
        message="Are you sure you want to delete this test series? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteTargetId(null);
        }}
      />
    </div>
    
  );
};

export default ManageTestSeries;