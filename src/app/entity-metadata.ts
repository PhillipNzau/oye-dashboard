import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    /* Store entities goes here
    # Exampple
    User: {
    selectId: (entity) => entity.id.id,
  },*/
  Transaction:{},
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};