import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
  it('should return init state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirPath: '/'
    })
  })

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirPath: '/'
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          userId: 'some-id'
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-id',
      error: null,
      loading: false,
      authRedirPath: '/'
    })
  })
})
