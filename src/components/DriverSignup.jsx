import React, { useState, useEffect } from 'react';
import './DriverSignup.css';

const DriverSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    
    driverLicenseNumber: '',
    licenseType: '',
    licenseExpiryDate: '',
    drivingExperience: '',
    ambulanceType: '',
    currentEmployer: '',
    
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    backgroundCheckAuthorization: false,
    locationTrackingConsent: false,
  });

  const [documents, setDocuments] = useState({
    driverLicense: null,
    profilePhoto: null,
    vehicleRC: null,
    insuranceDocument: null,
  });

  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locationStatus, setLocationStatus] = useState('Not enabled');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocationTracking, setIsLocationTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments({
      ...documents,
      [name]: files[0],
    });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setIsPreview(true);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If the user has consented to location tracking, start tracking
    if (formData.locationTrackingConsent) {
      startLocationTracking();
    }
    
    setIsSubmitted(true);
    // Here you would typically send the data to your server
    console.log('Form Data:', formData);
    console.log('Documents:', documents);
    console.log('Current Location:', currentLocation);
  };

  const handleEditForm = () => {
    setIsPreview(false);
  };

  // Location tracking functions
  const checkLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
      setLocationError('Geolocation is not supported');
      return false;
    }
    return true;
  };

  const getOneTimeLocation = () => {
    if (!checkLocationPermission()) return;

    setLocationStatus('Getting location...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        setLocationStatus('Location obtained');
        setLocationError(null);
      },
      (error) => {
        setLocationError(`Error: ${error.message}`);
        setLocationStatus('Failed to get location');
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const startLocationTracking = () => {
    if (!checkLocationPermission()) return;
    
    // Clear any existing watch
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setLocationStatus('Tracking location...');
    setIsLocationTracking(true);
    
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          speed: position.coords.speed || 'N/A'
        });
        setLocationStatus('Location tracking active');
        setLocationError(null);
        
        // Here you would typically send this location data to your server
        console.log('Updated location:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date(position.timestamp).toISOString()
        });
      },
      (error) => {
        setLocationError(`Error: ${error.message}`);
        setLocationStatus('Location tracking failed');
        setIsLocationTracking(false);
        console.error('Error tracking location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
    
    setWatchId(id);
  };

  const stopLocationTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsLocationTracking(false);
      setLocationStatus('Location tracking stopped');
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  if (isSubmitted) {
    return (
      <div className="ambulance-signup-container">
        <div className="submission-confirmation">
          <h2>Thank you for registering!</h2>
          <p>We will review your details and contact you soon.</p>
          <p>A confirmation has been sent to your contact number: {formData.contactNumber}</p>
          
          {formData.locationTrackingConsent && (
            <div className="location-tracking-info">
              <h3>Location Tracking Status</h3>
              <p>Status: {locationStatus}</p>
              {currentLocation && (
                <div>
                  <p>Current coordinates: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}</p>
                  <p>Accuracy: {currentLocation.accuracy ? `${currentLocation.accuracy.toFixed(2)} meters` : 'Unknown'}</p>
                  <button onClick={stopLocationTracking} className="stop-tracking-button">
                    Stop Location Tracking
                  </button>
                </div>
              )}
              {locationError && <p className="error-message">{locationError}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ambulance-signup-container">
      <div className="login-button-container">
        <button className="login-button">Log In</button>
      </div>
      
      <div className="ambulance-signup-header">
        <h1>Ambulance Driver Registration</h1>
        <p>Join our network of professional ambulance drivers and help save lives</p>
      </div>

      {isPreview ? (
        <div className="preview-container">
          <h2>Review Your Information</h2>
          <div className="preview-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Contact:</strong> {formData.contactNumber}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Emergency Contact:</strong> {formData.emergencyContactName} ({formData.emergencyContactRelation}) - {formData.emergencyContactPhone}</p>
          </div>

          <div className="preview-section">
            <h3>Professional Details</h3>
            <p><strong>Driver License:</strong> {formData.driverLicenseNumber}</p>
            <p><strong>License Type:</strong> {formData.licenseType}</p>
            <p><strong>License Expiry:</strong> {formData.licenseExpiryDate}</p>
            <p><strong>Experience:</strong> {formData.drivingExperience} years</p>
            <p><strong>Ambulance Type:</strong> {formData.ambulanceType}</p>
            <p><strong>Current Employer:</strong> {formData.currentEmployer || 'N/A'}</p>
          </div>

          <div className="preview-section">
            <h3>Documents Uploaded</h3>
            <p><strong>Driver's License:</strong> {documents.driverLicense ? documents.driverLicense.name : 'Not uploaded'}</p>
            <p><strong>Profile Photo:</strong> {documents.profilePhoto ? documents.profilePhoto.name : 'Not uploaded'}</p>
            <p><strong>Vehicle RC:</strong> {documents.vehicleRC ? documents.vehicleRC.name : 'Not uploaded'}</p>
            <p><strong>Insurance Document:</strong> {documents.insuranceDocument ? documents.insuranceDocument.name : 'Not uploaded'}</p>
          </div>

          <div className="preview-section">
            <h3>Location Tracking</h3>
            <p><strong>Consent to Location Tracking:</strong> {formData.locationTrackingConsent ? 'Yes' : 'No'}</p>
            {formData.locationTrackingConsent && (
              <p className="location-note">Your location will be tracked while on duty to improve response times and efficiency.</p>
            )}
          </div>

          <div className="preview-actions">
            <button type="button" onClick={handleEditForm} className="edit-button">Edit Information</button>
            <button type="button" onClick={handleSubmit} className="submit-button">Confirm & Submit</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePreview} className="ambulance-signup-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              <div className="name-inputs">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Mobile Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Residential Address</label>
              <textarea
                name="address"
                placeholder="Current Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                name="emergencyContactName"
                placeholder="Name"
                value={formData.emergencyContactName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="emergencyContactRelation"
                placeholder="Relation"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="emergencyContactPhone"
                placeholder="Phone Number"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>Professional Details</h2>
            <div className="form-group">
              <label>Driver License Number</label>
              <input
                type="text"
                name="driverLicenseNumber"
                placeholder="License Number"
                value={formData.driverLicenseNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>License Type</label>
              <select
                name="licenseType"
                value={formData.licenseType}
                onChange={handleChange}
                required
              >
                <option value="">Select License Type</option>
                <option value="LMV">LMV (Light Motor Vehicle)</option>
                <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>License Expiry Date</label>
              <input
                type="date"
                name="licenseExpiryDate"
                value={formData.licenseExpiryDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Years of Driving Experience</label>
              <input
                type="number"
                name="drivingExperience"
                placeholder="Years"
                min="1"
                value={formData.drivingExperience}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Ambulance Type</label>
              <select
                name="ambulanceType"
                value={formData.ambulanceType}
                onChange={handleChange}
                required
              >
                <option value="">Select Ambulance Type</option>
                <option value="Basic Life Support">Basic Life Support (BLS)</option>
                <option value="Advanced Life Support">Advanced Life Support (ALS)</option>
                <option value="Patient Transport">Patient Transport</option>
                <option value="Neonatal">Neonatal</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Current Employer (if applicable)</label>
              <input
                type="text"
                name="currentEmployer"
                placeholder="Employer Name"
                value={formData.currentEmployer}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>Document Uploads</h2>
            <div className="document-uploads">
              <div className="form-group upload-group">
                <label>Driver's License Copy</label>
                <input
                  type="file"
                  name="driverLicense"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <div className="form-group upload-group">
                <label>Profile Photo</label>
                <input
                  type="file"
                  name="profilePhoto"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <div className="form-group upload-group">
                <label>Vehicle Registration Certificate (RC) (if applicable)</label>
                <input
                  type="file"
                  name="vehicleRC"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="form-group upload-group">
                <label>Insurance Document (if applicable)</label>
                <input
                  type="file"
                  name="insuranceDocument"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Location Tracking</h2>
            <div className="form-group">
              <p className="location-description">
                For effective ambulance dispatch and coordination, we can track your location while you're on duty.
                This helps our system to assign the closest ambulance to emergencies, improving response times.
              </p>
              
              <div className="location-test-container">
                <button 
                  type="button" 
                  onClick={getOneTimeLocation} 
                  className="test-location-button"
                >
                  Test My Location
                </button>
                <div className="location-status">
                  <p>Status: {locationStatus}</p>
                  {currentLocation && (
                    <div>
                      <p>Current coordinates: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}</p>
                      <p>Accuracy: {currentLocation.accuracy ? `${currentLocation.accuracy.toFixed(2)} meters` : 'Unknown'}</p>
                    </div>
                  )}
                  {locationError && <p className="error-message">{locationError}</p>}
                </div>
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label important-checkbox">
                  <input
                    type="checkbox"
                    name="locationTrackingConsent"
                    checked={formData.locationTrackingConsent}
                    onChange={handleChange}
                    required
                  />
                  I consent to location tracking while on duty
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Account & Security</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Create a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                I agree to the Terms & Conditions
              </label>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="backgroundCheckAuthorization"
                  checked={formData.backgroundCheckAuthorization}
                  onChange={handleChange}
                  required
                />
                I authorize background check verification
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="preview-button">Preview Form</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DriverSignup;