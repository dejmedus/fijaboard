# Fijaboard Models - Testing Summary

This document summarizes the manual testing performed on the Fijaboard database models using the Flask shell. These tests verify that the models are correctly implemented according to the ERD (Entity Relationship Diagram) and function as expected.

## Models Tested

- **User**: Basic user account with authentication
- **Collection**: Groups of FijaLists belonging to a User
- **FijaList**: The core content type, connected to Collections (and thus to Users indirectly)
- **Tag**: Labels that can be applied to FijaLists
- **Join Tables**: fijalist_collection and fijalist_tag

## Test Categories and Results

### 1. Basic Model Creation and Properties

✅ **User Model**
- Created and retrieved users with proper attributes
- Verified username, email, and timestamp fields
- Confirmed password hashing functionality (via set_password method)

✅ **Collection Model**
- Created collections with proper attributes
- Verified name, description, and timestamp fields
- Confirmed collection is properly associated with a user

✅ **FijaList Model**
- Created FijaLists with proper attributes (title, description, content)
- Verified timestamp fields work correctly
- Confirmed FijaList does NOT have a direct user_id field (matches ERD)

✅ **Tag Model**
- Created tags with name field
- Verified unique constraint on tag names

### 2. Relationship Testing

✅ **User-Collection Relationship**
- Verified one-to-many relationship (user has many collections)
- Confirmed bidirectional navigation (user.collections and collection.user)

✅ **Collection-FijaList Relationship**
- Verified many-to-many relationship through fijalist_collection join table
- Confirmed bidirectional navigation (collection.fijalists and fijalist.collections)
- Tested adding a FijaList to a Collection

✅ **User-FijaList Indirect Relationship**
- Confirmed users access FijaLists through collections (indirect relationship)
- Verified the flow: User → Collection → FijaList

✅ **FijaList-Tag Relationship**
- Verified many-to-many relationship through fijalist_tag join table
- Confirmed bidirectional navigation (fijalist.tags and tag.fijalists)
- Tested adding tags to a FijaList

### 3. Cascade Delete Functionality

✅ **FijaList Deletion**
- Verified FijaList can be deleted
- Confirmed associations in join tables are removed
- Checked that associated Collections and Tags are not deleted

✅ **User Deletion**
- Verified User can be deleted
- Confirmed Collections are cascade deleted (cascade='all, delete-orphan')
- Verified associated FijaLists remain in database
- Verified Tags remain in database

## Special Notes

1. **FijaList Structure**: The testing confirmed that FijaList does not have a direct user_id field, which matches the ERD. FijaLists are connected to Users through the Collection model.

2. **Required Fields**:
   - FijaList requires the `content` field (JSON) to be non-null
   - User requires username, email, and password_hash
   - Collection requires name and user_id

3. **Unique Constraints**:
   - Tag names must be unique
   - User email and username must be unique

4. **Timestamp Behavior**:
   - created_at and updated_at fields are properly set when records are created
   - updated_at field is automatically updated when records are modified

## Test Implementation Details

The tests were performed using manual Flask shell commands, with careful handling of:
- Error states (including rollback when needed)
- Existing records (to avoid integrity errors)
- Relationship navigation in both directions
- Cascading deletion behavior

These tests confirm that the database models are correctly implemented according to the ERD and functioning as expected.